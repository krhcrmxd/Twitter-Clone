# TwitterClone [IN PROGRESS] 🐦

A full-stack Twitter-like web application built with a modern tech stack.  
Includes JWT authentication, custom UI components, and core functionality like posting and viewing tweets.

---

## ✨ Features

- 🔐 JWT-based authentication (access & refresh tokens)
- 💬 Post and view tweets (basic feed functionality)
- 🎨 Custom-designed UI components
- ⚛️ Built with React on the frontend
- 🛠️ Backend using NestJS + Prisma + PostgreSQL

---

## 📦 Tech Stack

**Frontend:**
- React
- TypeScript
- Tailwind CSS
- Axios with interceptors for token handling

**Backend:**
- NestJS
- Prisma ORM
- PostgreSQL
- JWT

---

## Configure environment variables
Create .env files for both frontend and backend.
For example (backend):

DATABASE_URL=postgresql://user:password@localhost:5432/twitterclone

JWT_SECRET=your_jwt_secret

JWT_REFRESH_SECRET=your_refresh_secret

---

## 💡 Possible Improvements
🔄 Add WebSocket support for real-time updates

💬 Expand to private messaging & chat functionality

📱 Improve UI/UX and small-screen adaptation

🧪 Add unit and integration tests


