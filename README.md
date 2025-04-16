# 📝 To-Do List App (MERN Stack)

A full-stack To-Do List application built with the MERN stack (MongoDB, Express.js, React, Node.js). This app allows users to register, log in, and manage their daily tasks efficiently.

## 🚀 Live Demo

Access the live application here: [To-Do List App](https://to-do-list-kj4q.onrender.com)

## 📂 Project Structure


## 🛠️ Technologies Used

### Frontend

- React
- Axios
- React Router
- Tailwind CSS 

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- bcrypt for password hashing
- cookie-parser for handling cookies
- CORS for cross-origin requests
- Brevo for automatic emails/2FA

## 🔐 Authentication & Authorization

- User registration and login with JWT-based authentication.
- Secure password storage using bcrypt hashing.
- Protected routes to ensure only authenticated users can access certain endpoints.

## 📋 Features

- User Registration & Login
- Create, Read, Update, and Delete (CRUD) tasks
- Mark tasks as completed
- Responsive design for various devices
- Persistent user sessions with cookies

## ⚙️ Installation & Setup

### Prerequisites

- Node.js and npm installed
- MongoDB instance running (local or cloud-based)

### Clone the Repository

```bash
git clone https://github.com/AustinBarikdar/To-do-List.git
cd To-do-List
```

Setup Backend
```bash
cd server
node server.js
```
.env for server
```env
MONGODB_URL = 'MANGODBURL'
JWT_SECRET='JWTSECRETKEY'
NODE_ENV = 'development'

SMTP_USER = 'BREVOSMTP'
SMTP_PASS = 'BREVOSMTP'

SENDER_EMAIL = 'BREVOSENDEREMAIL'
```

.env for client
```env
VITE_BACKEND_URL = "BACKENDURL"
```

Run client
```bash
cd server
npm run dev
```

## 📁 Folder Structure

### `client/`
- `src/`
  - `components/` – Reusable React components
  - `pages/` – Page components like Login, Register, Dashboard
  - `services/` – API calls using Axios
  - `App.js` – Main application component
  - `index.js` – Entry point of the React application

### `server/`
- `controllers/` – Functions handling request logic
- `models/` – Mongoose schemas and models
- `routes/` – Express route definitions
- `middleware/` – Custom middleware like authentication
- `server.js` – Entry point of the Express application

## 🧪 Testing

To be implemented: Unit and integration tests using Jest and Supertest.

## 📦 Deployment

The application is deployed on [Render](https://render.com) for both frontend and backend.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.


