<div align="center">

# SafeHer
### Women Safety SOS Platform

*A full-stack web application empowering women with real-time SOS alerts, emergency contact management, AI-powered safety assistance, and community incident reporting.*

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**[Live Demo](https://safeher.vercel.app)** · **[Report Bug](https://github.com/yourusername/safeher/issues)** · **[Request Feature](https://github.com/yourusername/safeher/issues)**

</div>

---

## Table of Contents

- [Project Overview](#1-project-overview)
- [Tech Stack](#2-tech-stack)
- [Core Features](#3-core-features)
- [Project Architecture](#4-project-architecture)
- [Database Models](#5-database-models)
- [AI Integration](#6-ai-integration)
- [Local Development Setup](#7-local-development-setup)
- [Deployment](#8-deployment)
- [Security Implementation](#9-security-implementation)
- [How the Platform Achieves Its Goal](#10-how-the-platform-achieves-its-goal)
- [Contributing](#11-contributing)
- [License](#12-license)

---

## 1. Project Overview

SafeHer addresses a critical real-world problem: **women lack a unified, accessible digital platform to call for help, track unsafe areas, and receive intelligent safety guidance in moments of danger.** Existing solutions are fragmented, lack real-time capability, or require specialized hardware.

SafeHer solves this by combining secure JWT authentication, GPS-based SOS alerting, community incident mapping, and Gemini AI-powered guidance in a single mobile-first web application — deployable at zero cost on Vercel and Render.

| | |
|---|---|
| **Problem** | Women in danger lack immediate structured digital tools to alert contacts, report incidents, and receive AI safety guidance. |
| **Solution** | One-tap SOS with live GPS, trusted contact management, community incident reporting, and a 24/7 AI safety chatbot — all secured behind JWT auth. |
| **Impact** | Reduces emergency response time, builds community safety awareness, and gives women full ownership of their safety data. |

---

## 2. Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | `React + Vite` | Component-based UI, fast HMR, modern dev tooling |
| Styling | `Tailwind CSS` | Utility-first, mobile-first responsive layout |
| Backend | `Node.js + Express.js` | RESTful API with controller/route/middleware architecture |
| Database | `MongoDB Atlas` | Cloud NoSQL — flexible document storage |
| ODM | `Mongoose` | Schema validation and model relationships |
| Authentication | `JWT + bcrypt` | Stateless tokens, secure password hashing (10 rounds) |
| AI Layer | `Google Gemini API` | Safety chatbot, severity analysis, SOS message generation |
| HTTP Client | `Axios` | API calls with JWT interceptor |
| Forms | `React Hook Form` | Client-side validation with performance optimization |
| Notifications | `React Hot Toast` | Non-blocking UI feedback for all actions |
| Security | `helmet + cors + rate-limit` | HTTP headers, CORS policy, brute-force protection |
| Deployment (FE) | `Vercel` | Zero-config React deployment with global CDN |
| Deployment (BE) | `Render.com` | Managed Node.js hosting with env variable support |

---

## 3. Core Features

| Feature | Description |
|---|---|
| **JWT Authentication** | Register/login with bcrypt hashing, 7-day token expiry, protected routes and frontend `ProtectedRoute` guard |
| **One-Tap SOS Alert** | Triggers with live GPS coordinates, timestamp, and AI-generated emergency message — saved to MongoDB instantly |
| **Emergency Contacts** | Manage up to 5 trusted contacts (name, phone, relationship) with full CRUD and validation |
| **Incident Reporting** | Report harassment, theft, assault with location, type, and description — builds community safety dataset |
| **Alert History** | Paginated view of all past SOS alerts and incident reports for the logged-in user |
| **AI Safety Chatbot** | 24/7 Gemini-powered assistant — safety advice, legal guidance, emergency action steps |
| **AI Severity Analyzer** | Auto-classifies incident severity (Low / Medium / High / Critical) using Gemini at submission time |
| **AI SOS Message Gen** | Generates a structured emergency message from GPS + context when SOS is triggered |
| **Admin Dashboard** | View all users, incidents, and AI-generated weekly pattern reports with high-risk zone summaries |
| **Mobile-First UI** | Fully responsive, minimal design inspired by Linear and Vercel — optimized for phone use in emergencies |

---

## 4. Project Architecture

### 4.1 Folder Structure

```
safeher/
│
├── server/                         # Express.js backend
│   ├── server.js                   # Entry point
│   ├── .env                        # Secrets & config (never commit)
│   ├── config/
│   │   └── db.js                   # MongoDB Atlas connection
│   ├── models/
│   │   ├── User.js
│   │   ├── Contact.js
│   │   ├── SOSAlert.js
│   │   └── Incident.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── contacts.js
│   │   ├── sos.js
│   │   ├── incidents.js
│   │   └── admin.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── contactController.js
│   │   ├── sosController.js
│   │   └── incidentController.js
│   ├── middleware/
│   │   ├── authMiddleware.js       # JWT verification
│   │   └── errorHandler.js
│   └── ai/
│       └── gemini.js               # Gemini API calls
│
└── client/                         # React + Vite frontend
    └── src/
        ├── main.jsx
        ├── App.jsx                 # React Router v6 routes
        ├── pages/
        │   ├── Landing.jsx
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── Dashboard.jsx
        │   ├── Contacts.jsx
        │   ├── SOS.jsx
        │   ├── Incidents.jsx
        │   ├── History.jsx
        │   ├── Profile.jsx
        │   └── Admin.jsx
        ├── components/
        │   ├── Navbar.jsx
        │   ├── ProtectedRoute.jsx
        │   ├── SOSButton.jsx
        │   ├── ChatBot.jsx
        │   ├── ContactCard.jsx
        │   └── IncidentCard.jsx
        ├── api/
        │   └── axios.js            # Base URL + JWT interceptor
        ├── context/
        │   └── AuthContext.js      # User state, login/logout
        └── hooks/
            ├── useAuth.js
            └── useLocation.js
```

### 4.2 API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Create new user account |
| `POST` | `/api/auth/login` | Public | Login — receive signed JWT |
| `GET` | `/api/auth/me` | Protected | Get logged-in user profile |
| `GET` | `/api/contacts` | Protected | List all emergency contacts |
| `POST` | `/api/contacts` | Protected | Add new emergency contact |
| `PUT` | `/api/contacts/:id` | Protected | Update a contact |
| `DELETE` | `/api/contacts/:id` | Protected | Remove a contact |
| `POST` | `/api/sos` | Protected | Trigger SOS alert with GPS location |
| `GET` | `/api/sos/history` | Protected | Get user SOS alert history |
| `POST` | `/api/incidents` | Protected | Submit new incident report |
| `GET` | `/api/incidents` | Protected | Get user incident reports |
| `GET` | `/api/admin/users` | Admin Only | All users and incidents overview |
| `GET` | `/api/admin/ai-report` | Admin Only | AI-generated pattern analysis |

---

## 5. Database Models

All models are defined using Mongoose with strict schema validation, indexed fields, and automatic timestamps.

| Model | Key Fields | Notes |
|---|---|---|
| `User` | `name, email, phone, password` | Unique email index; bcrypt hashed password; auto timestamps |
| `EmergencyContact` | `name, phone, relationship, userId` | Max 5 per user; `userId` ref to User model |
| `SOSAlert` | `latitude, longitude, message, userId` | Status: `active` / `resolved`; stores AI-generated message |
| `IncidentReport` | `incidentType, description, userId` | Types: harassment / theft / assault / other; AI severity field |

---

## 6. AI Integration

> All AI calls execute exclusively on the **backend**. The Gemini API key is stored in `.env` and is **never exposed to the client browser**. If the AI service is unavailable, the platform continues to function normally.

| AI Feature | Trigger | Output |
|---|---|---|
| **Incident Severity Analyzer** | On incident form submission | Badge: Low / Medium / High / Critical + 1-line risk summary saved to DB |
| **AI Safety Chatbot** | Floating widget on all protected pages | Safety advice, legal guidance, emergency action steps in real-time |
| **SOS Message Generator** | On SOS button trigger | Structured emergency message from GPS + timestamp + user context |
| **Incident Pattern Report** | Admin clicks Generate Report | Weekly summary, high-risk zones, peak hours, recommendations |

---

## 7. Local Development Setup

### 7.1 Prerequisites

- Node.js `v18+` and npm installed
- MongoDB Atlas account with a free M0 cluster created
- Gemini API key — free tier available at [aistudio.google.com](https://aistudio.google.com)
- Git installed on your machine

### 7.2 Clone & Install

```bash
# Clone the repository
git clone https://github.com/yourusername/safeher.git
cd safeher

# Install backend dependencies
cd server && npm install

# Install frontend dependencies
cd ../client && npm install
```

### 7.3 Environment Variables

Create a `.env` file inside the `/server` directory:

```env
# /server/.env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/safeher
JWT_SECRET=your_super_secret_key_minimum_32_characters
PORT=5000
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=your_gemini_api_key_here
```

Create a `.env` file inside the `/client` directory:

```env
# /client/.env
VITE_API_URL=http://localhost:5000
```

### 7.4 Run Locally

```bash
# Terminal 1 — Start the backend server
cd server && npm run dev
# Running on http://localhost:5000

# Terminal 2 — Start the frontend
cd client && npm run dev
# Running on http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 8. Deployment

| Service | Platform | Steps |
|---|---|---|
| **Database** | MongoDB Atlas | Create free M0 cluster → whitelist `0.0.0.0/0` → copy connection string to `MONGO_URI` |
| **Backend API** | Render.com | New Web Service → connect GitHub repo → set all server `.env` vars → deploy |
| **Frontend** | Vercel | Import repo → set `VITE_API_URL` to Render backend URL → deploy |

> **Important:** After deploying, update `CLIENT_URL` on Render to your Vercel domain. Update `VITE_API_URL` on Vercel to your Render backend URL. Configure CORS on the backend to allow your Vercel domain.

Add this to `/server/package.json` for Render compatibility:

```json
"engines": {
  "node": "18.x"
}
```

---

## 9. Security Implementation

- **Password Hashing** — bcrypt with 10 salt rounds. Passwords are never stored in plaintext
- **JWT Tokens** — Signed with HS256, expire in 7 days, verified on every protected route via Express middleware
- **Rate Limiting** — Auth routes capped at 10 requests per 15 minutes to prevent brute-force attacks
- **HTTP Security Headers** — `helmet.js` automatically configures 11 security-related headers on every response
- **CORS Policy** — Only the configured `CLIENT_URL` can access the API. No wildcard CORS in production
- **Input Validation** — `express-validator` on every POST/PUT route + React Hook Form validation on the frontend
- **AI Key Protection** — Gemini API key is used server-side only and never reaches the client browser

---

## 10. How the Platform Achieves Its Goal

SafeHer solves its core problem through four interconnected layers:

**1. Immediate Response Layer**
The one-tap SOS button captures GPS coordinates via the browser Geolocation API, generates an AI-written emergency message via Gemini, and persists the alert to MongoDB Atlas in under 2 seconds.

**2. Trust Network Layer**
Emergency contacts are stored per user in the database. Up to 5 trusted people are always one query away from notification, managed from a dedicated CRUD dashboard with full validation.

**3. Community Intelligence Layer**
Every submitted incident builds a shared dataset. The Admin AI Report surfaces patterns — repeat locations, peak hours, incident types — helping communities proactively address safety gaps before they escalate.

**4. AI Guidance Layer**
The Gemini-powered chatbot provides always-on safety advice and legal guidance without requiring a human counselor — critical for moments when users cannot make calls but urgently need actionable help.

---

## 11. Contributing

Contributions, issues, and feature requests are welcome.

```bash
# 1. Fork the repository on GitHub

# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Commit your changes (follow conventional commits)
git commit -m "feat: add your feature description"

# 4. Push to your branch
git push origin feature/your-feature-name

# 5. Open a Pull Request against the main branch
```

Please make sure your code follows the existing style and all routes have proper error handling and input validation.

---

## 12. License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for full terms and conditions.

---

<div align="center">

Built with purpose. **SafeHer** — because safety should be accessible to everyone.

*Made with ❤️ for a safer world*

</div>