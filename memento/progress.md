# Progress: Express.js Boilerplate

## 1. What Works

- **User Registration:** New users can sign up.
- **User Login:** Existing users can log in and receive a JWT.
- **Authentication Middleware:** A middleware exists to protect routes by verifying JWTs.
- **Basic Project Structure:** A modular structure is in place with a clear separation of concerns.

## 2. What's Left to Build

- **Authorization:** A role-based authorization system has been implemented.
  - The user model already included roles.
  - An authorization middleware has been created.
  - User management routes are now protected and require admin privileges.
- **Documentation:** The `README.md` has been updated with detailed instructions and API documentation.

## 3. Known Issues

- The `GET /:id` route in `user.routes.ts` is restricted to admins. It could be improved to allow a user to get their own profile.
- The `user.controller.ts` might need adjustments to handle the new authorization rules gracefully.
