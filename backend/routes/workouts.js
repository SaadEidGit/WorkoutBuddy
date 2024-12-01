const express = require('express')
const {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout, 
    updateSet,
    deleteSet
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

// Update a specific set in a workout (via index)
router.put('/:workoutId/sets/:setIndex', updateSet);

// Delete a specific set from a workout (via index)
router.delete('/:workoutId/sets/:setIndex', deleteSet);

module.exports = router