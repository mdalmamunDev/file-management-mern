# File Manager

A MERN stack project for managing files. This project uses **Node.js**, **Express.js**, **MongoDB**, **React**, and **Vite** to provide a simple and efficient way to manage files.

---

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (version 16 or above)
- **npm** or **yarn**
- **MongoDB** (local or remote database)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mdalmamunDev/file-management-mern.git
cd file-management-mern
```

---

## Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and configure the following environment variables:

   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   ```

4. Create the `uploads` directory inside the `backend` folder:

   ```bash
   mkdir uploads
   ```

5. Start the backend server:

   ```bash
   nodemon index.js
   ```

   The backend server will run on `http://localhost:3000` by default.

---

## Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Update the `baseUrl` in the global context to match your backend server's URL (e.g., `http://localhost:3000`).

4. Start the frontend development server:

   ```bash
   npm run dev
   ```

   The frontend server will run on `http://localhost:5173` by default.

---

## Running the Project

1. Ensure the backend server is running (`http://localhost:3000`).
2. Ensure the frontend server is running (`http://localhost:5173`).
3. Open your browser and navigate to `http://localhost:5173` to access the application.

---

## Additional Notes

- **Backend**:
  - Use `nodemon` for automatic server restarts during development.
  - Ensure MongoDB is running locally or provide a valid remote connection string in the `.env` file.

- **Frontend**:
  - The project uses **React** with **Vite** for fast development builds.
  - Make sure the `baseUrl` in the global context matches the backend server's URL.

---

## Scripts

### Backend

- `nodemon index.js`: Starts the backend server using `nodemon`.

### Frontend

- `npm run dev`: Starts the frontend development server.
- `npm run build`: Builds the frontend for production.
- `npm run preview`: Previews the production build.

---