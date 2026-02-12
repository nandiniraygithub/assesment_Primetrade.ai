Perfect! Here’s a **complete, professional README** for your RBAC project, ready for GitHub. I’ve included: backend/frontend setup, environment variables with hidden credentials, admin setup, SMTP instructions, and Swagger UI.

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
* **Email Notifications:** Nodemailer (SMTP)
* **API Documentation:** Swagger UI

---

## Features

* User registration and login
* Role-based access (User / Admin)
* Protected routes for admin-only actions
* CRUD operations for data entities
* Password reset via email
* API documentation with Swagger UI

---

## Installation

### Prerequisites

* Node.js installed
* npm installed
* MongoDB running locally or via Atlas

---

### Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create a .env file in the backend folder with the following:
PORT=5000
MONGO_URI=your_mongo_uri_here
JWT_SECRET_KEY=your_jwt_secret_here
JWT_EXPIRES_IN=30d
COOKIE_EXPIRES_IN=30

# SMTP Configuration for Email Sending
SMTP_SERVICE=gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_MAIL=your_email_here
SMTP_PASSWORD=your_password_here

# Run the backend server
npm run dev
```

---

### Frontend Setup

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

**Option 1: Hardcoded for testing (not recommended for production)**

```javascript
const email = "admin@gmail.com";
const passwordRaw = "123456";
```

**Option 2: Environment variables (recommended)**

```env
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=123456
```

Access in backend via `process.env.ADMIN_EMAIL` and `process.env.ADMIN_PASSWORD`.

---

## Environment Variables

### Backend `.env` Example

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/dbname
JWT_SECRET_KEY=your_jwt_secret
JWT_EXPIRES_IN=30d
COOKIE_EXPIRES_IN=30

# SMTP Configuration
SMTP_SERVICE=gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_MAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Admin
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=123456
```

> **Security Tip:** Add `.env` to `.gitignore` so sensitive info is never pushed to GitHub. Use `.env.example` for collaborators.

---

## API Documentation (Swagger UI)

This project uses **Swagger UI** for interactive API documentation.

**Access Swagger UI:**

```
http://localhost:5000/api-docs/
```

### Features in Swagger UI:

* View all API endpoints (Auth, Users, Admin, etc.)
* Check request parameters and responses
* Test APIs directly from the browser

### How to Use:

1. Run the backend server (`npm run dev`).
2. Open the URL in your browser.
3. Explore and test APIs interactively.

---

## Usage

1. Start backend and frontend servers.
2. Open frontend in browser (usually `http://localhost:3000`).
3. Register as a user or use admin credentials to access protected routes.

---

## Contributing

* Fork the repository
* Create a new branch for features/fixes
* Submit a pull request

---

## License

MIT License

---

