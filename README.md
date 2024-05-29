# Express UI Boilerplate

This project is a boilerplate for building web applications with Express.js. It includes a pre-configured setup for Sass, Jest, ESLint, and Nodemon.

## Getting Started

To get started with this project, follow these steps:


1. Install the dependencies:
    ```
    npm install
    ```

2. Start the development server:
    ```
    npm run dev
    ```

## Scripts

- `npm run build:sass`: Compiles Sass files into CSS.
- `npm test`: Runs the Jest test suite.
- `npm run test:coverage`: Runs the Jest test suite and generates a coverage report.
- `npm run eslint`: Lints the project using ESLint.
- `npm run dev`: Starts the development server with Nodemon.

## Libraries

This project uses the following libraries:

- `body-parser`: Middleware to parse incoming request bodies.
- `compression`: Middleware to compress response bodies for improved performance.
- `connect-redis`: Redis session store for Express.
- `cookie-parser`: Middleware to parse cookies.
- `dotenv`: Loads environment variables from a .env file.
- `express`: Fast, unopinionated, minimalist web framework for Node.js.
- `express-session`: Simple session middleware for Express.
- `express-validator`: An Express middleware for data validation.
- `helmet`: Helps secure Express apps by setting various HTTP headers.

## Project Structure

The `setup` folder contains configuration for various parts of the application:

- `setupLanguage.js`: Configures i18next for internationalization.
- `setupMiddleware.js`: Configures Express middleware.
- `setupRoutes.js`: Configures Express routes.
- `setupSession.js`: Configures Express session.
- `setupTemplate.js`: Configures Nunjucks for templating.