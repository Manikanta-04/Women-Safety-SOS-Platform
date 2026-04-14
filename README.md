<div align="center">

# 🛡️ SafeHer — Women Safety SOS Platform

### *A full-stack web application empowering women with real-time SOS alerts, AI-powered safety guidance, and community incident reporting.*

<br/>

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Frontend-6366f1?style=for-the-badge)](https://women-safety-sos-platform-mauve.vercel.app/)
[![Backend API](https://img.shields.io/badge/🔗_API-Backend-22c55e?style=for-the-badge)](https://women-safety-sos-platform.onrender.com/api/health)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Manikanta_Naripeddi-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/manikanta-naripeddi-4326232a5/)
[![GitHub](https://img.shields.io/badge/GitHub-Manikanta--04-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Manikanta-04)

<br/>

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## 🔗 Live URLs

| Layer | URL | Status |
|---|---|---|
| **Frontend** | [https://women-safety-sos-platform-mauve.vercel.app/](https://women-safety-sos-platform-mauve.vercel.app/) | ✅ Live on Vercel |
| **Backend API** | [https://women-safety-sos-platform.onrender.com/api/health](https://women-safety-sos-platform.onrender.com/api/health) | ✅ Live on Render |

> 🗒️ **Note for recruiters:** The backend runs on Render's free tier and may take ~30 seconds to wake up on first request. Once warm, all API responses are fast.

---

## 💡 What Is SafeHer?

**SafeHer** is a real-world safety platform built specifically for women. In an emergency, users can trigger a one-tap SOS that:

1. **Captures live GPS coordinates** via the browser Geolocation API
2. **Generates an AI-written emergency message** using Google Gemini
3. **Saves the alert to a cloud database** (MongoDB Atlas) in under 2 seconds
4. **Notifies trusted emergency contacts** stored in the user's profile

Beyond SOS, the platform lets users **report incidents** (harassment, theft, assault), which are analyzed by AI for severity and collectively build a community safety map that admins can review.

---

## 🧩 Problem → Solution

| Problem | Solution |
|---|---|
| Women in danger lack a fast, unified digital tool to call for help | One-tap SOS with live GPS captures and stores alerts instantly |
| No structured way to document unsafe incidents | Community incident reporting with AI severity classification |
| Safety advice isn't available 24/7 in emergencies | Gemini-powered AI chatbot for always-on guidance |
| Fragmented tools spread across multiple apps | Everything — SOS, contacts, reporting, chat — in one mobile-first app |

---

## ✨ Key Features

### 🚨 One-Tap SOS Alert
- Triggers with a single button press
- Captures real-time GPS (latitude + longitude)
- AI generates a structured emergency message on the spot
- Alert is instantly saved to MongoDB with timestamp

### 👥 Emergency Contact Management
- Add up to 5 trusted contacts (name, phone, relationship)
- Full CRUD — add, edit, delete from the dashboard
- Contacts are linked to the user's account securely

### 📍 Incident Reporting
- Report harassment, theft, assault, or other incidents
- AI automatically classifies severity: **Low / Medium / High / Critical**
- Builds a community dataset that admins can analyze for patterns

### 🤖 AI Safety Chatbot (Gemini-Powered)
- Floating widget available on every page after login
- Provides real-time safety advice, legal guidance, and emergency action steps
- Works 24/7 without any human involvement

### 📊 Admin Dashboard
- View all users, alerts, and incident reports
- One-click AI-generated weekly pattern report — high-risk zones, peak hours, incident trends

### 🔐 Secure Authentication
- JWT-based login with 7-day token expiry
- Passwords hashed with bcrypt (10 salt rounds)
- Protected routes on both frontend and backend

---

## 🛠️ Tech Stack — Why Each Tool Was Chosen

| Layer | Technology | Why |
|---|---|---|
| **Frontend** | React + Vite | Fast build, component reusability, great mobile UX |
| **Styling** | Tailwind CSS | Utility-first; rapid mobile-first UI development |
| **Backend** | Node.js + Express.js | Lightweight, async-friendly REST API |
| **Database** | MongoDB Atlas | Flexible document model for safety alerts + incidents |
| **ODM** | Mongoose | Schema validation and model relationships |
| **Auth** | JWT + bcrypt | Stateless, scalable, secure |
| **AI** | Google Gemini API | Severity analysis, SOS message generation, chatbot |
| **HTTP Client** | Axios | Interceptors for auto-attaching JWT to every request |
| **Forms** | React Hook Form | Performant validation without re-renders |
| **Notifications** | React Hot Toast | Non-blocking feedback on every user action |
| **Security** | helmet + cors + rate-limit | Industry-standard HTTP hardening |
| **Frontend Deploy** | Vercel | Zero-config CI/CD with global CDN |
| **Backend Deploy** | Render.com | Managed Node.js hosting with env variable support |

---

## 🗂️ Project Structure

```
safeher/
│
├── server/                         # Express.js backend
│   ├── server.js                   # Entry point
│   ├── config/db.js                # MongoDB Atlas connection
│   ├── models/                     # Mongoose schemas
│   │   ├── User.js
│   │   ├── Contact.js
│   │   ├── SOSAlert.js
│   │   └── Incident.js
│   ├── routes/                     # API route definitions
│   ├── controllers/                # Business logic
│   ├── middleware/
│   │   ├── authMiddleware.js       # JWT verification
│   │   └── errorHandler.js
│   └── ai/
│       └── gemini.js               # All Gemini API integrations
│
└── client/                         # React + Vite frontend
    └── src/
        ├── pages/                  # Full-page views (Dashboard, SOS, Contacts, etc.)
        ├── components/             # Reusable UI (SOSButton, ChatBot, Navbar, etc.)
        ├── api/axios.js            # Base URL + JWT interceptor
        ├── context/AuthContext.js  # Global auth state
        └── hooks/                  # useAuth, useLocation
```

---

## 📡 API Reference

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Create a new user account |
| `POST` | `/api/auth/login` | Public | Login and receive a signed JWT |
| `GET` | `/api/auth/me` | Protected | Get current user profile |
| `GET` | `/api/contacts` | Protected | List emergency contacts |
| `POST` | `/api/contacts` | Protected | Add a new contact |
| `PUT` | `/api/contacts/:id` | Protected | Update a contact |
| `DELETE` | `/api/contacts/:id` | Protected | Remove a contact |
| `POST` | `/api/sos` | Protected | Trigger SOS with GPS location |
| `GET` | `/api/sos/history` | Protected | View past SOS alerts |
| `POST` | `/api/incidents` | Protected | Submit an incident report |
| `GET` | `/api/incidents` | Protected | View user's incident reports |
| `GET` | `/api/admin/users` | Admin Only | All users + incident overview |
| `GET` | `/api/admin/ai-report` | Admin Only | AI-generated weekly pattern report |
| `GET` | `/api/health` | Public | Backend health check |

---

## 🗄️ Database Models

| Model | Key Fields | Notes |
|---|---|---|
| `User` | `name, email, phone, password` | Unique email; bcrypt hashed password; auto timestamps |
| `EmergencyContact` | `name, phone, relationship, userId` | Max 5 per user; references User |
| `SOSAlert` | `latitude, longitude, message, userId` | Status: `active` / `resolved`; stores AI-generated message |
| `IncidentReport` | `incidentType, description, severity, userId` | AI severity auto-filled on submission |

---

## 🤖 AI Integration (Google Gemini)

> All AI calls run **server-side only**. The API key is stored in `.env` and is never exposed to the browser. If AI is unavailable, the platform continues to work normally.

| Feature | When It Runs | Output |
|---|---|---|
| **SOS Message Generator** | On SOS button press | Structured emergency message from GPS + timestamp |
| **Incident Severity Analyzer** | On incident submission | Low / Medium / High / Critical + 1-line summary |
| **AI Safety Chatbot** | On-demand (floating widget) | Safety advice, legal info, emergency steps |
| **Pattern Report** | Admin clicks "Generate Report" | Weekly summary — high-risk zones, peak hours, trends |

---

## 🔒 Security Highlights

- **Password Hashing** — bcrypt with 10 salt rounds; plaintext passwords never stored
- **JWT Authentication** — HS256-signed tokens, 7-day expiry, verified on every protected route
- **Rate Limiting** — Auth routes capped at 10 requests/15 minutes to block brute-force attacks
- **HTTP Security Headers** — `helmet.js` sets 11 security headers on every response
- **CORS Policy** — Only the configured frontend URL can access the API (no wildcard in production)
- **Input Validation** — `express-validator` on all POST/PUT routes + React Hook Form on the frontend
- **AI Key Protection** — Gemini API key is server-side only, never sent to the client

---

## 🚀 Run Locally

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier)
- Gemini API key — [aistudio.google.com](https://aistudio.google.com) (free tier)

### Clone & Install

```bash
git clone https://github.com/yourusername/safeher.git
cd safeher

cd server && npm install
cd ../client && npm install
```

### Environment Variables

**`/server/.env`**
```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/safeher
JWT_SECRET=your_super_secret_key_minimum_32_characters
PORT=5000
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=your_gemini_api_key_here
```

**`/client/.env`**
```env
VITE_API_URL=http://localhost:5000
```

### Start the App

```bash
# Terminal 1 — Backend
cd server && npm run dev
# → http://localhost:5000

# Terminal 2 — Frontend
cd client && npm run dev
# → http://localhost:5173
```

---

## ☁️ Deployment

| Service | Platform | Key Step |
|---|---|---|
| **Database** | MongoDB Atlas | Free M0 cluster → whitelist `0.0.0.0/0` → copy connection string |
| **Backend** | Render.com | Connect GitHub → set `.env` vars → deploy as Web Service |
| **Frontend** | Vercel | Import repo → set `VITE_API_URL` to Render URL → deploy |

> After deploying: update `CLIENT_URL` on Render to your Vercel domain, and update `VITE_API_URL` on Vercel to your Render backend URL.

---

## 🤝 Contributing

```bash
# 1. Fork the repo on GitHub
# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Commit with conventional commits
git commit -m "feat: add your feature description"

# 4. Push and open a Pull Request
git push origin feature/your-feature-name
```

Please ensure all routes include proper error handling and input validation before submitting a PR.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

<div align="center">

### 🌐 Try It Live

**Frontend:** [https://women-safety-sos-platform-mauve.vercel.app/](https://women-safety-sos-platform-mauve.vercel.app/)

**Backend Health Check:** [https://women-safety-sos-platform.onrender.com/api/health](https://women-safety-sos-platform.onrender.com/api/health)

<br/>

*Built with purpose — because safety should be accessible to everyone.* 💜

<br/>

---

### 👨‍💻 Author

**Manikanta Naripeddi**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/manikanta-naripeddi-4326232a5/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Manikanta-04)

</div>