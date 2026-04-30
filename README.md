# Project Deployment Links
Deployment link submission:
https://ai-customer-support-dashboard-gamma.vercel.app/

Backend deployment link on render:
https://ai-customer-support-dashboard-sw2c.onrender.com/

Frontend and full project deployment link is same.


# AI Customer Support Dashboard

A full-stack web application built with React, Node.js, Express, and MongoDB. Users can register, log in, chat with an AI-powered support assistant, and view conversation history. Administrators can monitor users and chat activity from an admin dashboard.

## Features

- User registration and login with JWT authentication
- Secure password hashing using bcrypt
- AI chat interface with message persistence
- User chat history retrieval
- Admin dashboard for user and chat monitoring
- Admin actions: view users, filter chats, delete users, delete chat records
- Backend-ready AI integration via OpenAI / Gemini / Mistral API

## Technology Stack

- Frontend: React, Vite, React Router, Axios
- Backend: Node.js, Express, JWT, bcryptjs
- Database: MongoDB with Mongoose
- AI: OpenAI-compatible chat completion integration (fallback placeholder available)

## Repository Structure

- `backend/` — Node.js API server and database models
- `frontend/` — React app and UI components

## Setup Instructions

### 1. Install dependencies

Open two terminals.

In `backend/`:

```powershell
cd g:\KOI_Assignment\AI_Customer_Support_Dashboard-\backend
npm install
```

In `frontend/`:

```powershell
cd g:\KOI_Assignment\AI_Customer_Support_Dashboard-\frontend
npm install
```

### 2. Configure environment variables

Create a `.env` file in `backend/` with the following values:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ai-support-dashboard
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
AI_MODEL=gpt-4o-mini
AI_PROVIDER=openai
ADMIN_EMAIL=admin@example.com
```

> If you do not have an OpenAI API key, the backend uses a mocked AI reply placeholder.

### 3. Start the backend server

```powershell
cd g:\KOI_Assignment\AI_Customer_Support_Dashboard-\backend
npm run dev
```

### 4. Start the frontend app

```powershell
cd g:\KOI_Assignment\AI_Customer_Support_Dashboard-\frontend
npm run dev
```

### 5. Access the application

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — login and receive JWT token

### Chat

- `POST /api/chat` — send user message and receive AI response
- `GET /api/chat/history` — retrieve authenticated user's chat history

### Admin

- `GET /api/admin/users` — list registered users
- `GET /api/admin/chats` — list chat records
- `DELETE /api/admin/users/:id` — delete a user and their chats
- `DELETE /api/admin/chats/:id` — delete a single chat record

## Database Schemas

### Users

- `_id`: ObjectId
- `name`: string
- `email`: string
- `password`: hashed string
- `role`: string (`user` or `admin`)
- `createdAt`: timestamp

### Chats

- `_id`: ObjectId
- `userId`: ObjectId reference to user
- `message`: string
- `response`: string
- `createdAt`: timestamp

## Notes

- Admin access is granted automatically for users registered with the email configured in `ADMIN_EMAIL`.
- The frontend proxy is configured to forward `/api` requests to `http://localhost:5000`.
- For production deployment, configure secure environment values and use HTTPS.
 