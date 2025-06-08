# MERN Stack Email Verification & Password Reset

A full-stack authentication system built with the MERN stack (MongoDB, Express, React, Node.js) featuring secure email verification and password reset functionality.

---

## Features

- User registration with email verification
- Secure login with JWT authentication
- Password reset via email
- Protected routes and role-based access
- State management in React using Zustand

---

## Tech Stack

- **Frontend:** React, Zustand (state management)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens), Nodemailer for emails

---

## Getting Started

### 1. Clone the repository

git clone https://github.com/yourusername/mern-auth-email-verification.git
cd mern-auth-email-verification

### 2. Install dependencies

#### Backend

cd backend
npm install

#### Frontend

cd client
npm install


### 3. Configure environment variables

Create a `.env` file in the `backend` folder with the following content:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:3000


### 4. Start the servers

#### Start the backend server

cd server
npm run dev

> Runs the backend server on the default port (usually 5000). Uses nodemon for auto-reloading.

#### Start the frontend server

Open a new terminal window/tab, then:
cd client
npm run dev

> Runs the React development server on [http://localhost:3000](http://localhost:3000).

---

## How It Works

- **Registration:** User signs up and receives a verification email with a unique link.
- **Email Verification:** Clicking the link verifies the email and activates the account.
- **Login:** User logs in using JWT authentication; state is managed with Zustand in React.
- **Password Reset:** User requests a password reset, receives a secure email link, and sets a new password.

---

## NPM Scripts

### Backend

- `npm run dev` &mdash; Start backend with nodemon for development
- `npm start` &mdash; Start backend in production mode

### Frontend

- `npm start` &mdash; Start React development server
- `npm run build` &mdash; Build React app for production

---

## Security

- JWT-based authentication for all protected routes
- Email verification to prevent fake registrations
- Secure password reset tokens
- React state managed securely with Zustand

---

---

**Contributions welcome!**  
For issues or feature requests, please open an issue or submit a pull request.


