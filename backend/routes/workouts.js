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
const Workout = require('../models/workoutModel')

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

// Add this route to your existing routes
router.post('/:id/sets', requireAuth, async (req, res) => {
    const { id } = req.params
    const { reps, weight } = req.body

    try {
        const workout = await Workout.findById(id)
        if (!workout) {
            return res.status(404).json({error: 'Workout not found'})
        }

        // Add new set to the workout
        workout.sets = workout.sets || [] // Initialize sets array if it doesn't exist
        workout.sets.push({ reps, weight })
        
        const updatedWorkout = await workout.save()
        res.status(200).json(updatedWorkout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = router