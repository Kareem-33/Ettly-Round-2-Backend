# Ettly Calculation Tree (Backend)

This is the backend API for the Ettly "Calculation Tree" application. It is a **Node.js**, **Express**, and **MongoDB** server built with **TypeScript**.

This API handles user authentication, stores calculation data, and provides all the necessary endpoints for the [Ettly Frontend](https://github.com/Kareem-33/Ettly-Round-2-Frontend) application.

  - **Live Backend:** [https://ettly-round-2-backend-production.up.railway.app/](https://www.google.com/search?q=https://ettly-round-2-backend-production.up.railway.app/)

-----

## \#\# Features

  * **JWT Authentication:** Secure API with cookie-based JWTs for user registration, login, and session management.
  * **RESTful API:** A clear and modular API structure for users and calculations.
  * **Calculation Tree Logic:** Manages the parent-child relationships between calculations.
  * **CORS Enabled:** Configured with `cors` to specifically allow requests from the deployed frontend.

-----

## \#\# Tech Stack

  * **Runtime:** [Node.js](https://nodejs.org/)
  * **Framework:** [Express.js](https://expressjs.com/)
  * **Language:** [TypeScript](https://www.typescriptlang.org/)
  * **Database:** [MongoDB](https://www.mongodb.com/) (using [Mongoose](https://mongoosejs.com/))
  * **Authentication:** [JSON Web Token (JWT)](https://jwt.io/) & [bcrypt.js](https://www.google.com/search?q=https://github.com/kelektiv/bcrypt.js)
  * **Middleware:** [cookie-parser](https://github.com/expressjs/cookie-parser), [cors](https://github.com/expressjs/cors)
  * **Environment:** [dotenv](https://github.com/motdotla/dotenv)

-----

## \#\# Getting Started

### \#\#\# Prerequisites

  * Node.js (v18 or newer)
  * A MongoDB connection string (e.g., from a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster)

### \#\#\# Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Kareem-33/Ettly-Round-2-Backend.git
    cd Ettly-Round-2-Backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a file named `.env` in the root of the project. Add the following keys:

    ```.env
    # Your port (e.g., 4444)
    PORT=4444

    # Your MongoDB Atlas connection string
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/yourDatabaseName

    # A long, random string for signing tokens
    JWT_SECRET=YOUR_SECRET_RANDOM_STRING

    # The URL of your local frontend app
    CLIENT_URL=http://localhost:5173
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    The server will start on the port you defined in your `.env` file.

### \#\#\# Build for Production

```bash
npm run build
```

This will compile the TypeScript code into the `/dist` folder.

### \#\#\# Start Production Server

```bash
npm start
```

This runs the compiled JavaScript from the `/dist` folder.

-----

## \#\# API Endpoints

All endpoints are prefixed with `/api`.

### \#\#\# Auth Routes (`/api/user`)

  * `POST /register`: Register a new user.
  * `POST /login`: Log in a user and set an `httpOnly` auth cookie.
  * `POST /logout`: Clear the auth cookie to log out.
  * `GET /profile`: (Protected) Get the currently authenticated user's profile.

### \#\#\# Calculation Routes (`/api/calculation`)

  * `GET /`: Get all calculations, populated with user and parent data.
  * `POST /`: (Protected) Create a new root-level "starting number".
  * `POST /:id/reply`: (Protected) Reply to an existing calculation (identified by `:id`).
