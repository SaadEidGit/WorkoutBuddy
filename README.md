# Workout Buddy

Workout Buddy is a MERN stack application that helps users manage and track their workout plans. Users can create multiple workout plans, add exercises to each plan, and track their progress over time.

## Tech Stack

- **M**ongoDB - Document database
- **E**xpress.js - Node.js web framework
- **R**eact.js - Client-side JavaScript framework
- **N**ode.js - JavaScript runtime

## Key Features

- User authentication and authorization
- Create and manage multiple workout plans
- Add, delete, and update workouts
- Track workout details including load, reps, and creation date
- Secure API endpoints with JWT tokens
- Responsive design

## Core Concepts

- RESTful API architecture
- JWT (JSON Web Token) authentication
- Context API for state management
- Custom React hooks
- MongoDB database operations
- Express middleware
- Protected routes
- Async/await operations

## Installation

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB installed and running locally
- npm or yarn package manager

### Backend Setup

1. Clone the repository
   bash
  git clone https://github.com/yourusername/workout-buddy.git
  cd workout-buddy

2. Install backend dependencies
   bash npm install

3. Create a `.env` file in the root directory and add:
  env
  PORT=4000
  MONGO_URI=your_mongodb_connection_string
  SECRET=your_jwt_secret

4. Start the backend server
  bash
  npm run dev

The server will run on `http://localhost:4000`

### Frontend Setup

1. Navigate to the frontend directory
  bash
  cd frontend
2. Install frontend dependencies
   bash npm install
3. Start the frontend application
  bash npm start


The application will open in your default browser at `http://localhost:3000`

## API Endpoints

- `POST /api/user/login` - User login
- `POST /api/user/signup` - User registration
- `GET /api/workoutplans` - Get all workout plans
- `POST /api/workoutplans` - Create a new workout plan
- `PATCH /api/workoutplans/:id` - Update a workout plan
- `DELETE /api/workouts/:id` - Delete a workout
