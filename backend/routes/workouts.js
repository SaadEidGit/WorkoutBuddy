const express = require('express')
const {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controller/workoutController')
const requireAuth = require('../middleware/requireAuth')

// creating a router since we need access to the app express instance from the server.js
const router = express.Router()

// fire this function before any of the end points
// requires auth for all endpoints below
router.use(requireAuth)

// defining api endpoints
router.get('/', getWorkouts)

router.get('/:id', getWorkout)

router.post('/', createWorkout)

router.delete('/:id', deleteWorkout)

router.patch('/:id', updateWorkout)

module.exports = router