# System Patterns: Express.js Boilerplate

## 1. System Architecture

The application follows a standard Model-View-Controller (MVC) like pattern, but tailored for a REST API:

- **Models:** Define the data structure and interact with the MongoDB database using Mongoose. (e.g., [`user.model.ts`](src/models/user.model.ts:1))
- **Controllers:** Handle incoming HTTP requests, process input, and invoke services to perform business logic. (e.g., [`auth.controller.ts`](src/modules/auth/auth.controller.ts:1))
- **Services:** Contain the core business logic, separating it from the transport layer (HTTP). (e.g., [`auth.service.ts`](src/modules/auth/auth.service.ts:1))
- **Routes:** Map API endpoints to specific controller functions. (e.g., [`auth.routes.ts`](src/modules/auth/auth.routes.ts:1))
- **Middlewares:** Provide functionalities like authentication, error handling, and request processing that can be chained in the request-response cycle. (e.g., [`auth.middleware.ts`](src/middlewares/auth.middleware.ts:1))

## 2. Design Patterns

- **Modular Structure:** The code is organized by features (e.g., `auth` module), promoting separation of concerns and scalability.
- **Asynchronous Handling:** The use of `asyncHandler` utility ([`asyncHandler.ts`](src/utils/asyncHandler.ts:1)) standardizes promise-based error handling for async route handlers.
- **Centralized Error Handling:** A dedicated error middleware ([`errors.middleware.ts`](src/middlewares/errors.middleware.ts:1)) catches and processes all errors, ensuring consistent error responses.
