// Node.js & Backend Architecture Blogs (8 to 10)
export const nodeBlogs = [
  {
    id: "building-scalable-rest-apis-nodejs-express",
    slug: "building-scalable-rest-apis-nodejs-express",
    title: "Building Scalable RESTful APIs with Node.js, Express & Clean Architecture",
    metaTitle: "Building Scalable REST APIs with Node.js & Express | Md Rahmatullah Quraishi",
    metaDescription: "Master enterprise REST API engineering in Node.js and Express. Learn the Controller-Service-Repository pattern, Zod validation, JWT security, custom error handlers, and clustering.",
    keywords: [
      "Node.js scalable REST API architecture",
      "Express clean architecture tutorial",
      "Controller Service Repository pattern Node.js",
      "Zod schema validation Express middleware",
      "Centralized error handling Express",
      "Node.js clustering production scaling",
      "RESTful API design best practices",
      "Md Rahmatullah Quraishi Node.js engineer",
      "Full stack Node.js backend architecture"
    ],
    category: "Node.js & Backend",
    readTime: "11 min read",
    wordCount: 1240,
    publishedAt: "2026-06-14",
    updatedAt: "2026-10-10",
    author: {
      name: "Md Rahmatullah Quraishi",
      role: "Full Stack Developer & Backend Specialist",
      avatar: "/images/rahmatullah-quraishi.jpg"
    },
    featured: true,
    excerpt: "Escape spaghetti Express code. Architect robust, maintainable RESTful APIs using Clean Architecture, strict schema validation, structured error handling, and production clustering.",
    tableOfContents: [
      { id: "the-pitfalls-of-unstructured-express-apps", title: "1. The Pitfalls of Unstructured Express Codebases" },
      { id: "clean-layered-architecture-explained", title: "2. The Controller-Service-Repository Pattern" },
      { id: "runtime-validation-with-zod", title: "3. Robust Request Validation with Zod Middleware" },
      { id: "centralized-async-error-handling", title: "4. Centralized Async Error Handling Pipeline" },
      { id: "production-clustering-and-process-scaling", title: "5. Production Process Scaling with PM2 and Node Cluster" },
      { id: "security-middleware-checklist", title: "6. Essential Production Security Middleware" },
      { id: "frequently-asked-questions", title: "7. Frequently Asked Questions" }
    ],
    content: `
## 1. The Pitfalls of Unstructured Express Codebases

Express.js is notoriously un-opinionated. While this flexibility enables developers to spin up an HTTP server in ten lines of code, it frequently leads teams into architectural chaos. In unguided projects, controllers become bloated monsters—validating request bodies, executing raw database queries, handling business logic, sending emails, and formatting JSON responses all inside a single 400-line route handler.

When a codebase reaches this state, unit testing becomes nearly impossible, refactoring breaks unmapped dependencies, and onboarding new engineers stalls.

---

## 2. The Controller-Service-Repository Pattern

To build backends that easily scale across hundreds of thousands of requests and years of iterative features, divide your application into three distinct decoupled layers:

1. **Controller Layer:** Parses HTTP requests, executes validation middleware, and formats the final HTTP response (Status codes, JSON headers). Zero business logic.
2. **Service Layer:** Encapsulates the core business rules, calculations, external API triggers, and domain workflows. Completely agnostic of Express (\`req\` or \`res\`).
3. **Repository Layer:** Interfaces directly with the database (Prisma, Mongoose, Knex, raw SQL). Handles data persistence and query optimization.

### Layered Code Implementation:

\`\`\`typescript
// 1. Repository Layer: Only talks to DB
export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async create(data: CreateUserDTO) {
    return prisma.user.create({ data });
  }
}

// 2. Service Layer: Pure Business Logic
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async registerUser(dto: CreateUserDTO) {
    const existing = await this.userRepo.findByEmail(dto.email);
    if (existing) {
      throw new ConflictError('A user with this email address already exists.');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12);
    const user = await this.userRepo.create({ ...dto, password: hashedPassword });

    // Send welcome email asynchronously without blocking
    emailQueue.add('welcome-email', { userId: user.id });

    return { id: user.id, email: user.email, name: user.name };
  }
}

// 3. Controller Layer: Express HTTP Bridge
export class UserController {
  constructor(private userService: UserService) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.userService.registerUser(req.body);
      return res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error); // Forward to centralized error handler
    }
  };
}
\`\`\`

---

## 3. Robust Request Validation with Zod Middleware

Never trust data incoming from the internet. Validate headers, params, and payloads at the perimeter before any controller logic executes:

\`\`\`typescript
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(422).json({
          success: false,
          error: 'Validation failed',
          issues: error.issues.map(i => ({ field: i.path.join('.'), message: i.message }))
        });
      }
      next(error);
    }
  };
};

// Usage with a strict Zod Schema
export const RegisterSchema = z.object({
  email: z.string().email('Invalid email address format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name is required'),
});

// In routes.ts
router.post('/register', validateRequest(RegisterSchema), userController.register);
\`\`\`

---

## 4. Centralized Async Error Handling Pipeline

Eliminate repetitive try/catch blocks that pollute routes by establishing custom error classes and a centralized global error middleware:

\`\`\`typescript
export class AppError extends Error {
  constructor(public message: string, public statusCode: number = 500) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Requested resource not found') {
    super(message, 404);
  }
}

// Global Error Handler Middleware (placed at very end of Express pipeline)
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  // Log error with correlation ID for debugging
  console.error('[Error] ' + req.method + ' ' + req.url + ':', err);

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
\`\`\`

---

## 5. Production Process Scaling with PM2 and Node Cluster

Node.js is single-threaded by nature. If your production server has 8 CPU cores, a default Node process utilizes only 1 core, leaving 87.5% of server compute idle.

Use **PM2** to run Node in cluster mode, automatically distributing traffic across all available CPU cores:

\`\`\`javascript
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'api-server',
      script: './dist/server.js',
      instances: 'max', // Spawns 1 process per CPU core
      exec_mode: 'cluster',
      autorestart: true,
      max_memory_restart: '500M',
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
    },
  ],
};
\`\`\`

---

## 6. Essential Production Security Middleware

Always mount the standard security stack on your Express app:
- **Helmet:** Sets modern security headers (\`Content-Security-Policy\`, \`X-Frame-Options\`).
- **CORS:** Restricts cross-origin requests to explicit domain whitelists.
- **Express-Rate-Limit:** Prevents abusive scraping and DDoS requests.
- **hpp:** Protects against HTTP Parameter Pollution.

---

## 7. Frequently Asked Questions

### Q1: Should I use Express or Fastify for new Node.js APIs?
**Answer:** Express has the richest ecosystem and greatest enterprise adoption. However, Fastify offers 2x higher raw throughput and built-in schema compilation. For most commercial applications, Express with Clean Architecture is more than fast enough.

### Q2: How should I manage environment variables securely in Node.js?
**Answer:** Use \`dotenv\` coupled with Zod or \`envalid\` to validate environment variables during startup. If required variables (like \`DATABASE_URL\` or \`JWT_SECRET\`) are missing or malformed, crash the server immediately before listening on HTTP ports.
    `
  },
  {
    id: "real-time-chat-collaboration-websockets-nodejs",
    slug: "real-time-chat-collaboration-websockets-nodejs",
    title: "Building Real-Time Web Applications with WebSockets, Node.js & Redis Pub/Sub",
    metaTitle: "Real-Time WebSockets with Node.js & Redis Pub/Sub | Md Rahmatullah Quraishi",
    metaDescription: "Build production-grade real-time chat and collaborative apps. Learn WebSockets, Socket.IO, connection heartbeats, presence tracking, and scaling horizontally with Redis Pub/Sub.",
    keywords: [
      "WebSockets Node.js tutorial",
      "Socket.IO Redis Pub Sub scaling",
      "Real-time chat architecture Node.js",
      "Horizontal scaling WebSockets cluster",
      "Presence tracking Redis WebSockets",
      "WebSocket heartbeat reconnection",
      "Bidirectional streaming web apps",
      "Md Rahmatullah Quraishi WebSocket engineer",
      "Production real time full stack architecture"
    ],
    category: "Node.js & Backend",
    readTime: "11 min read",
    wordCount: 1210,
    publishedAt: "2026-06-28",
    updatedAt: "2026-10-11",
    author: {
      name: "Md Rahmatullah Quraishi",
      role: "Full Stack Developer & Backend Specialist",
      avatar: "/images/rahmatullah-quraishi.jpg"
    },
    featured: false,
    excerpt: "Scale WebSockets beyond a single server. Discover how Redis Pub/Sub enables seamless real-time messaging, presence indicators, and live typing across multi-node clusters.",
    tableOfContents: [
      { id: "the-limitations-of-http-polling", title: "1. The Limitations of HTTP Polling & SSE" },
      { id: "websocket-protocol-fundamentals", title: "2. WebSocket Protocol Fundamentals" },
      { id: "building-the-core-socket-server", title: "3. Building the Core Socket.IO Server" },
      { id: "the-horizontal-scaling-conundrum", title: "4. The Horizontal Scaling Problem" },
      { id: "solving-cross-server-events-with-redis-pubsub", title: "5. Solving Cross-Server Events with Redis Pub/Sub" },
      { id: "user-presence-and-heartbeat-management", title: "6. User Presence Tracking with Heartbeats" },
      { id: "frequently-asked-questions", title: "7. Frequently Asked Questions" }
    ],
    content: `
## 1. The Limitations of HTTP Polling & SSE

In the early days of real-time web development, developers relied on short HTTP polling—firing a request every 2 seconds to check for new messages. This created massive server overhead, consuming TCP handshakes, SSL negotiations, and HTTP headers just to receive empty arrays.

Server-Sent Events (SSE) offer an efficient unidirectional stream from server to client, but fall short for interactive applications (like messaging or multiplayer whiteboards) that require low-latency bidirectional communication.

The **WebSocket protocol (RFC 6455)** solves this by establishing a persistent, full-duplex TCP channel over a single socket connection with minimal framing overhead (just 2 to 10 bytes per message).

---

## 2. WebSocket Protocol Fundamentals

A WebSocket connection begins its life as a standard HTTP/1.1 request containing an \`Upgrade: websocket\` header. Once the server accepts the upgrade via an HTTP \`101 Switching Protocols\` response, the connection switches protocols permanently, keeping the socket open until explicitly closed by either peer.

---

## 3. Building the Core Socket.IO Server

Socket.IO builds on top of WebSockets, adding automatic reconnections, room-based grouping, and fallback transports (HTTP long-polling) for restrictive corporate firewalls.

\`\`\`typescript
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: 'https://myworkspace.com', methods: ['GET', 'POST'] },
  pingTimeout: 20000,
  pingInterval: 10000,
});

// Authentication Middleware on Socket Handshake
io.use((socket: Socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error('Authentication token missing'));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    socket.data.userId = decoded.userId;
    next();
  } catch (err) {
    next(new Error('Invalid or expired authentication token'));
  }
});

io.on('connection', (socket: Socket) => {
  const userId = socket.data.userId;
  console.log(\`User connected: \${userId} (Socket: \${socket.id})\`);

  // Join a dedicated room for this user's direct messages
  socket.join(\`user:\${userId}\`);

  // Handle joining a project collaboration channel
  socket.on('channel:join', (channelId: string) => {
    socket.join(\`channel:\${channelId}\`);
    socket.to(\`channel:\${channelId}\`).emit('user:joined', { userId });
  });

  // Handle message broadcasting
  socket.on('message:send', async (data: { channelId: string; content: string }) => {
    // Save to database first
    const savedMsg = await saveMessageToDatabase(data.channelId, userId, data.content);

    // Broadcast to everyone in the room except sender
    socket.to(\`channel:\${data.channelId}\`).emit('message:received', savedMsg);
  });

  socket.on('disconnect', () => {
    console.log(\`User disconnected: \${userId}\`);
  });
});
\`\`\`

---

## 4. The Horizontal Scaling Problem

When traffic increases and you spin up 4 server instances behind an AWS ALB or Nginx load balancer, a major breakdown occurs:
- User A is connected to **Server 1**.
- User B is connected to **Server 2**.
- When User A emits a message to the room, Server 1 only broadcasts it to clients connected to Server 1. **User B never receives the message!**

---

## 5. Solving Cross-Server Events with Redis Pub/Sub

To broadcast events across different physical servers, integrate the **@socket.io/redis-adapter**. 

Whenever an event is emitted on Server 1, Socket.IO publishes the packet to a central Redis Pub/Sub channel. All other server nodes receive the event and broadcast it to their local connected sockets.

\`\`\`typescript
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

const pubClient = createClient({ url: process.env.REDIS_URL });
const subClient = pubClient.duplicate();

await Promise.all([pubClient.connect(), subClient.connect()]);

// Mount Redis Adapter to Socket.IO Server
io.adapter(createAdapter(pubClient, subClient));
\`\`\`

With just these 5 lines of code, your real-time infrastructure can scale horizontally across 50 nodes effortlessly.

---

## 6. User Presence Tracking with Heartbeats

Tracking whether users are Online, Away, or Offline requires an in-memory presence registry backed by Redis:

\`\`\`typescript
// When socket connects
await redis.hset('presence:online_users', userId, Date.now());

// Heartbeat interval from client every 30 seconds
socket.on('heartbeat', async () => {
  await redis.hset('presence:online_users', userId, Date.now());
});

// Periodic worker pruning stale sessions
setInterval(async () => {
  const users = await redis.hgetall('presence:online_users');
  const now = Date.now();
  const threshold = 45000; // 45 seconds

  for (const [uid, lastSeen] of Object.entries(users)) {
    if (now - parseInt(lastSeen, 10) > threshold) {
      await redis.hdel('presence:online_users', uid);
      io.emit('user:offline', { userId: uid });
    }
  }
}, 30000);
\`\`\`

---

## 7. Frequently Asked Questions

### Q1: Should I use raw ws or Socket.IO?
**Answer:** Use raw \`ws\` if you need extreme microsecond latency or are building a native binary protocol. Use \`Socket.IO\` if you want built-in reconnection logic, fallbacks, rooms, multiplexing, and simple horizontal scaling via Redis.

### Q2: What sticky-session configuration is needed for WebSockets?
**Answer:** If using HTTP long-polling fallbacks, your load balancer (Nginx/HAProxy/ALB) must enable IP hash or cookie-based sticky sessions. If you enforce pure WebSockets (\`transports: ['websocket']\`), sticky sessions are not strictly mandatory once the connection is established.
    `
  },
  {
    id: "api-rate-limiting-ddos-protection-nodejs-laravel",
    slug: "api-rate-limiting-ddos-protection-nodejs-laravel",
    title: "API Rate Limiting & DDoS Mitigation Strategies in Node.js and Laravel",
    metaTitle: "API Rate Limiting & DDoS Mitigation: Node.js & Laravel | Md Rahmatullah Quraishi",
    metaDescription: "Protect production APIs from scraping, credential stuffing, and DDoS attacks. Learn Token Bucket algorithms, Sliding Window rate limiters with Redis, and Cloudflare WAF integration.",
    keywords: [
      "API rate limiting strategies",
      "DDoS mitigation Node.js Express",
      "Laravel Redis rate limiter tutorial",
      "Token bucket rate limiting algorithm",
      "Sliding window counter Redis",
      "Prevent API scraping bots",
      "API security best practices 2026",
      "Md Rahmatullah Quraishi API security",
      "High availability web defense"
    ],
    category: "Node.js & Backend",
    readTime: "10 min read",
    wordCount: 1160,
    publishedAt: "2026-07-08",
    updatedAt: "2026-10-10",
    author: {
      name: "Md Rahmatullah Quraishi",
      role: "Full Stack Developer & Security Specialist",
      avatar: "/images/rahmatullah-quraishi.jpg"
    },
    featured: false,
    excerpt: "Defend public APIs against denial of service, aggressive scrapers, and credential brute-force attacks with battle-tested Redis rate limiting algorithms.",
    tableOfContents: [
      { id: "why-every-public-api-needs-rate-limiting", title: "1. Why Every Public API Needs Rate Limiting" },
      { id: "rate-limiting-algorithms-compared", title: "2. Token Bucket vs Sliding Window Log Algorithms" },
      { id: "sliding-window-rate-limiter-with-redis", title: "3. Implementing a Sliding Window Limiter in Redis" },
      { id: "tiered-rate-limiting-by-api-key-or-tier", title: "4. Tiered Rate Limiting by User Role & Subscription Tier" },
      { id: "graceful-429-too-many-requests-responses", title: "5. Standard RFC 6585 Headers (Retry-After)" },
      { id: "edge-defense-with-cloudflare-waf", title: "6. Combining Application Throttling with Cloudflare WAF" },
      { id: "frequently-asked-questions", title: "7. Frequently Asked Questions" }
    ],
    content: `
## 1. Why Every Public API Needs Rate Limiting

Any API connected to the public internet is a target. Malicious automated bots continuously execute credential stuffing attacks on authentication routes, aggressive scrapers scrape proprietary catalog pricing, and denial-of-service (DDoS) attempts exhaust database connection pools.

Without rate limiting, a single rogue script sending 500 requests per second can starve your database CPU, leading to cascading failures across your entire infrastructure.

---

## 2. Rate Limiting Algorithms Compared

Different algorithms offer varying levels of accuracy and memory consumption:

- **Fixed Window Counter:** Tracks requests per calendar minute (e.g., 00:01 to 00:02). Flaw: allows traffic bursts of 2x the limit across window boundaries (e.g. 100 requests at 00:00:59 and 100 requests at 00:01:01).
- **Token Bucket:** Continuously refills tokens into a bucket at a fixed rate. Requests consume tokens. Great for handling legitimate burst traffic while capping sustained throughput.
- **Sliding Window Counter:** Blends the previous window's request count with the current window's elapsed percentage. Provides smooth rate enforcement with minimal memory overhead.

---

## 3. Implementing a Sliding Window Limiter in Redis

Using Redis Sorted Sets (\`ZSET\`), we can implement an atomic, accurate sliding window rate limiter:

\`\`\`typescript
import Redis from 'ioredis';
import { Request, Response, NextFunction } from 'express';

const redis = new Redis(process.env.REDIS_URL!);

export interface RateLimitOptions {
  windowMs: number;
  maxRequests: number;
}

export function slidingWindowRateLimiter(options: RateLimitOptions) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const key = \`rate_limit:\${req.baseUrl}\${req.path}:\${ip}\`;
    const now = Date.now();
    const windowStart = now - options.windowMs;

    try {
      // Execute multi-command pipeline atomically
      const pipeline = redis.pipeline();
      
      // Remove requests older than the sliding window
      pipeline.zremrangebyscore(key, 0, windowStart);
      
      // Count remaining requests in the active window
      pipeline.zcard(key);
      
      // Add current request timestamp
      pipeline.zadd(key, now, \`\${now}-\${Math.random()}\`);
      
      // Set TTL to auto-expire idle keys
      pipeline.expire(key, Math.ceil(options.windowMs / 1000));

      const results = await pipeline.exec();
      const requestCount = results?.[1]?.[1] as number;

      // Set standard RFC rate limit headers
      res.setHeader('X-RateLimit-Limit', options.maxRequests);
      res.setHeader('X-RateLimit-Remaining', Math.max(0, options.maxRequests - requestCount));

      if (requestCount > options.maxRequests) {
        res.setHeader('Retry-After', Math.ceil(options.windowMs / 1000));
        return res.status(429).json({
          success: false,
          error: 'Too Many Requests',
          message: 'Rate limit exceeded. Please throttle your requests.',
        });
      }

      next();
    } catch (err) {
      console.error('Rate limiting error, passing through:', err);
      next(); // Fail open so users aren't locked out during Redis blips
    }
  };
}
\`\`\`

---

## 4. Tiered Rate Limiting by User Role & Subscription Tier

In commercial SaaS platforms, rate limits should dynamically reflect user tiers:
- **Anonymous Guests:** 20 req / minute
- **Authenticated Free Users:** 120 req / minute
- **Enterprise API Tier:** 5,000 req / minute

\`\`\`php
// In Laravel: routes/api.php
RateLimiter::for('api', function (Request $request) {
    if ($request->user()?->isEnterprise()) {
        return Limit::perMinute(5000)->by($request->user()->id);
    }

    if ($request->user()) {
        return Limit::perMinute(120)->by($request->user()->id);
    }

    return Limit::perMinute(20)->by($request->ip());
});
\`\`\`

---

## 5. Standard RFC 6585 Headers (Retry-After)

When responding with HTTP \`429 Too Many Requests\`, always provide informative headers so legitimate API clients can schedule retries gracefully:
- \`X-RateLimit-Limit\`: The maximum requests allowed in the current timeframe.
- \`X-RateLimit-Remaining\`: Number of remaining allowed calls.
- \`X-RateLimit-Reset\`: Unix timestamp when the quota resets.
- \`Retry-After\`: Number of seconds to wait before attempting another request.

---

## 6. Combining Application Throttling with Cloudflare WAF

Application-level rate limiting (inside Node or Laravel) consumes web server resources to inspect requests. For massive DDoS floods (e.g. 50,000 requests per second), relying on your backend will overwhelm your server memory.

**Best Practice Defense Architecture:**
- **Layer 1 (The Edge):** Configure **Cloudflare WAF** to block bad ASN IP ranges, challenge malicious browser fingerprints with Managed Challenge, and throttle volumetric traffic before it reaches your origin IP.
- **Layer 2 (The Application):** Use Redis-backed rate limiting to enforce granular business-tier quotas and route-specific login protections.

---

## 7. Frequently Asked Questions

### Q1: Should rate limiters "fail open" or "fail closed" if Redis is down?
**Answer:** In most production APIs, rate limiters should **fail open** (allow the request through while logging an alert) so that a transient Redis outage does not completely take down access for all paying customers.

### Q2: How do I handle users behind corporate NATs sharing a single public IP?
**Answer:** For authenticated endpoints, always rate limit by the unique User ID or API Token, not the IP address. Reserve IP-based limiting strictly for public, unauthenticated routes.
    `
  }
];
