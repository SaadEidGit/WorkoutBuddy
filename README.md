# Workout Buddy

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that helps users track and manage their workout plans.

## Features

- User authentication and authorization
- Create and manage multiple workout plans
- Add, edit, and delete individual workouts
- Track workout details including exercises, loads, and reps
- Responsive user interface

## Prerequisites

Before you begin, ensure you have installed:
- Node.js
- MongoDB
- npm (Node Package Manager)

## Installation

1. Clone the repository:
2. Install backend dependencies:
```bash
cd backend
npm install
```
3. Install frontend dependencies:
```bash
cd frontend
npm install
```  
## Configuration

1. Create a `.env` file in the backend directory with the following variables:
```bash
  env
  PORT=4000
  MONGO_URI=your_mongodb_connection_string
  SECRET=your_jwt_secret
```


## Running the Application

1. Start the backend server:
 ```bash
 cd backend
 npm run dev
 ```
The backend server will run on `http://localhost:4000`

3. Start the frontend development server:
```bash
cd frontend
npm start
```

The frontend will run on `http://localhost:3000`

## Technologies Used

- **Frontend:**
  - React.js
  - React Router
  - Context API for state management
  - CSS for styling

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - JWT for authentication
 
## Screenshots
### Login/ Sign Up Page
<img width="1440" alt="Screenshot 2025-01-01 at 2 33 21 PM" src="https://github.com/user-attachments/assets/0b97b5a4-bdcb-425f-b70b-3b9cc0437062" />

### Workout Plan Page
<img width="1440" alt="Screenshot 2025-01-01 at 2 31 47 PM" src="https://github.com/user-attachments/assets/9ac01285-f143-4ddf-bdf5-3e0b65d9d505" />

### Workout Page
<img width="1440" alt="Screenshot 2025-01-01 at 2 30 46 PM" src="https://github.com/user-attachments/assets/91b11aba-4720-4217-be78-7881d88244de" />
