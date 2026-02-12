Got it! You want a **README** for your RBAC project, including instructions for running backend and frontend, plus handling the admin credentials and environment variables. Here’s a professional draft you can use and adapt:

---

# RBAC Project

## Description

This project implements **Role-Based Access Control (RBAC)** using Node.js, Express, MongoDB, and React.
It supports user registration, login, and admin-specific functionalities with protected routes based on roles.

---

## Tech Stack

* **Backend:** Node.js, Express.js
* **Frontend:** React.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT (JSON Web Tokens)
* **Password Security:** bcrypt

---

## Features

* User registration and login
* Role-based access (User / Admin)
* Protected routes for admin-only actions
* CRUD operations for data entities
* Environment variables for sensitive data

---

## Getting Started

### Prerequisites

* Node.js installed
* npm installed
* MongoDB running locally or via Atlas

---

### Installation

#### Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create a .env file in the backend folder with the following variables:
# PORT=5000
# MONGO_CONN=<Your MongoDB connection string>
# JWT_SECRET=<Your JWT secret>

# Run the backend server
npm run dev
```

#### Frontend

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Run the frontend server
npm run dev
```

---

## Admin Credentials

To create an initial admin account, you can either:

**Option 1: Hardcode for testing (not recommended for production)**

```javascript
const email = "admin@gmail.com";
const passwordRaw = "123456";
```

**Option 2: Use environment variables (recommended)**
Add to your `.env` file:

```env
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=123456
```

Then in your backend, you can access them via `process.env.ADMIN_EMAIL` and `process.env.ADMIN_PASSWORD`.

---

## Usage

1. Run backend and frontend servers.
2. Open frontend in browser (usually `http://localhost:3000`).
3. Register as a user or use admin credentials to access protected routes.

---

## Environment Variables

**Backend `.env` example**

```env

PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/dbname
JWT_SECRET_KEY=your_jwt_secret
JWT_EXPIRES_IN=30d
COOKIE_EXPIRES_IN=30

# SMTP Configuration for Email Sending
SMTP_SERVICE=gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_MAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password

```

**Frontend `.env` example (if needed)**

```env
VITE_API_URL=http://localhost:5000
```

---

## Contributing

* Fork the repository
* Create a new branch for features/fixes
* Submit a pull request

---

## License

MIT License

