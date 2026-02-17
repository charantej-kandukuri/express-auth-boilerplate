# Express.js Authentication & Authorization Boilerplate

This is a boilerplate project for building REST APIs with Express.js, featuring a complete setup for JWT-based authentication and role-based authorization.

## Features

- **Authentication:** Secure user registration and login using JSON Web Tokens (JWT).
- **Authorization:** Role-based access control (RBAC) to protect routes. Users can have `user` or `admin` roles.
- **Password Security:** Passwords are securely hashed using `bcryptjs`.
- **Ready-to-Use API:** Endpoints for user management and authentication are pre-configured.
- **TypeScript:** The entire codebase is written in TypeScript for better maintainability and type safety.
- **Modular Structure:** Code is organized into modules for scalability and separation of concerns.
- **Centralized Error Handling:** A dedicated middleware for consistent error responses.

## Tech Stack

- **Node.js & Express.js:** Backend framework.
- **TypeScript:** Language.
- **MongoDB & Mongoose:** Database and ODM.
- **JSON Web Tokens (jsonwebtoken):** For authentication tokens.
- **bcryptjs:** For hashing passwords.
- **dotenv:** For managing environment variables.

## Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or on a cloud service)

### 2. Installation

1.  **Clone the repository:**

    ```bash
    git clone <your-repo-url>
    cd express-auth
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add the following variables. You can copy from `.env.example`.

    ```env
    PORT=5000
    MONGO_URI=<your-mongodb-connection-string>
    JWT_SECRET=<your-jwt-secret>
    JWT_EXPIRES_IN=1d
    JWT_COOKIE_EXPIRES_IN=1
    REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
    REFRESH_TOKEN_EXPIRES_IN=7d
    REFRESH_TOKEN_COOKIE_EXPIRES_IN=7
    ```

### 3. Running the Application

- **Development mode:**

  ```bash
  npm run dev
  ```

  The server will start on `http://localhost:5000` and will automatically restart on file changes.

- **Production mode:**
  ```bash
  npm run build
  npm start
  ```

## API Endpoints

### Authentication (`/api/auth`)

- `POST /register`: Register a new user.
  - **Body:** `{ "name": "Test User", "email": "user@example.com", "password": "password123" }`
- `POST /login`: Log in a user.
  - **Body:** `{ "email": "user@example.com", "password": "password123" }`
- `POST /logout`: Log out the current user. (Requires authentication)
- `GET /me`: Get the profile of the currently logged-in user. (Requires authentication)
- `POST /refresh`: Refresh the access token using a refresh token.

### User Management (`/api/users`)

All user management routes require `admin` role access.

- `POST /`: Create a new user. (Admin only)
- `GET /`: Get a list of all users. (Admin only)
- `GET /:id`: Get a single user by ID. (Admin only)
- `PUT /:id`: Update a user by ID. (Admin only)
- `DELETE /:id`: Delete a user by ID. (Admin only)
