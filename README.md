# Md Rahmatullah Quraishi — Senior Portfolio Website

> **Full Stack Developer** with 2+ years of production experience building modern websites, scalable web applications, REST APIs, and digital business solutions.
>
> *"Turning Ideas Into Powerful Digital Experiences."*

---

## 🚀 Live Demo & Production Readiness

- **Framework**: React 18, Vite, Tailwind CSS, Framer Motion, Lucide Icons
- **Design System**: Premium Dark Navy Hero with Electric Blue Accents, high-contrast readable content sections, and custom typography (Plus Jakarta Sans & JetBrains Mono)
- **Deployment Platform**: Optimized for **Vercel** with `vercel.json` SPA routing, cache policies, and security headers.

---

## 🛠️ Technology Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Bootstrap 5 |
| **Backend** | PHP, Laravel, CodeIgniter, Node.js, Express.js, REST API Development |
| **Databases** | MySQL, MongoDB, Relational Schema Architecture, Query Optimization |
| **Integrations** | JWT Authentication, Payment Gateway Integration, Third-Party APIs, Webhooks |
| **DevOps & Tools**| Git, GitHub, Linux Server Basics, cPanel, VPS Deployment |
| **Mobile & SEO** | Flutter (Hands-on), Technical SEO, Google Analytics (GA4), Search Console |

---

## 📂 Project Architecture

```plaintext
rahmatcoders-portfolio/
├── public/
│   ├── favicon.svg          # Custom RQ monogram vector favicon
│   ├── og-preview.svg       # High-resolution Open Graph social share banner
│   ├── robots.txt           # Search engine crawler permissions
│   └── sitemap.xml          # XML sitemap for SEO discovery
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Sticky header with active scrollspy & drawer
│   │   ├── Hero.jsx         # Dark navy hero, portrait avatar, and tech pills
│   │   ├── About.jsx        # Engineering biography and core pillars
│   │   ├── Skills.jsx       # Categorized skills without fake percentage bars
│   │   ├── Services.jsx     # 8 benefit-focused cards with inquiry CTAs
│   │   ├── Projects.jsx     # 5 verified projects in interactive browser mockups
│   │   ├── ProjectModal.jsx # Detailed architecture modal (problem/solution/role)
│   │   ├── Experience.jsx   # Career progression timeline
│   │   ├── Education.jsx    # BCA & MCA degrees from IGNOU
│   │   ├── Contact.jsx      # Lead gen form, budget selector, copy email, confetti
│   │   ├── ResumeModal.jsx  # Printable resume preview & PDF trigger
│   │   ├── Footer.jsx       # Navigation, verified links & back-to-top control
│   │   └── Toast.jsx        # Non-intrusive feedback notifications
│   ├── data/
│   │   └── portfolioData.js # Single source of truth for all verified data
│   ├── App.jsx              # Main application root
│   ├── index.css            # Tailwind directives and custom utility classes
│   └── main.jsx             # React entry point
├── .env.example             # Environment variables blueprint
├── .gitignore               # Standard Git ignore rules
├── index.html               # Semantic HTML with SEO meta tags & JSON-LD Schema
├── package.json             # Dependencies and scripts
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.js       # Tailwind design tokens and extended palettes
├── vercel.json              # Vercel SPA routing and HTTP security headers
├── vite.config.js           # Vite configuration with chunk splitting
└── README.md                # Deployment and documentation guide
```

---

## 💻 Local Development Setup

### 1. Prerequisites
Ensure you have **Node.js** (v18+) and **npm** installed on your system.

### 2. Installation
Clone or navigate to the project directory and install dependencies:
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or the port specified in terminal).

### 4. Build for Production
To produce an optimized production bundle:
```bash
npm run build
```
The optimized output will be generated inside the `dist/` directory.

---

## 🌐 GitHub to Vercel Deployment Instructions

Follow these straightforward steps to deploy your portfolio to [Vercel](https://vercel.com/) with automatic continuous deployments on every Git push:

### Step 1: Initialize Git and Push to GitHub

1. Open your terminal in this project folder:
   ```bash
   git init
   git add .
   git commit -m "feat: complete premium full stack developer portfolio"
   ```

2. Create a new repository on your GitHub account (`https://github.com/rahmatullahcodes/portfolio` or any name you prefer).

3. Link your remote repository and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/rahmatullahcodes/<your-repo-name>.git
   git push -u origin main
   ```

---

### Step 2: Deploy on Vercel

1. Go to [https://vercel.com](https://vercel.com) and log in with your **GitHub** account.
2. On your Vercel Dashboard, click **"Add New..."** → **"Project"**.
3. Select your GitHub repository from the list and click **"Import"**.
4. In the **Configure Project** screen:
   - **Framework Preset**: `Vite` (Vercel detects this automatically from `package.json` and `vercel.json`)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. **Environment Variables**:
   Under **Environment Variables**, add the following two keys so the contact form can dispatch emails in production:
   - **`GMAIL_USER`**: `mdrahmatullahquraishi@gmail.com`
   - **`GMAIL_APP_PASSWORD`**: `ataekazlfggpkvcr`
6. Click **"Deploy"**.

Within 30–60 seconds, Vercel will complete the build and assign you a live production URL (e.g., `https://rahmatullah-portfolio.vercel.app`).

---

### Step 3: Add Custom Domain (Optional)

1. In your Vercel project dashboard, go to **Settings** → **Domains**.
2. Enter your custom domain (e.g., `rahmatullah.dev` or `yourdomain.com`).
3. Follow the DNS instructions provided by Vercel to configure your `CNAME` or `A` records.
4. Vercel automatically issues and renews an SSL/TLS HTTPS certificate for free.

---

## 🔒 Environment Variables

The project uses serverless email routing. Credentials are kept private in `.env` (ignored by Git) and configured in Vercel:

| Variable | Description | Value |
| :--- | :--- | :--- |
| `GMAIL_USER` | Your Gmail address where project inquiries will be sent | `mdrahmatullahquraishi@gmail.com` |
| `GMAIL_APP_PASSWORD` | 16-character Google App Password for SMTP authentication | `ataekazlfggpkvcr` |

*Security Notice: The app password is executed strictly on the backend / serverless runtime (`api/contact.js`) and is NEVER exposed in the client-side JavaScript bundle.*

---

## 👤 Developer Profile & Verification

- **Developer**: Md Rahmatullah Quraishi
- **Title**: Full Stack Developer (2+ Years Experience)
- **Email**: [mdrahmatullahquraishi@gmail.com](mailto:mdrahmatullahquraishi@gmail.com)
- **LinkedIn**: [linkedin.com/in/md-rahmatullah-723176238](https://www.linkedin.com/in/md-rahmatullah-723176238)
- **GitHub**: [github.com/rahmatullahcodes](https://github.com/rahmatullahcodes)
- **Education**: BCA (2021) & MCA (2023) — Indira Gandhi National Open University (IGNOU)

