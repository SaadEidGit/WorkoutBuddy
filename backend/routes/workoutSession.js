const express = express('express')
const {
    createWorkoutSession,
    deleteWorkoutSession,
    updateWorkoutSession,
    getWorkoutSession,
    getAllWorkoutSessions
} = require('../controller/workoutSessionController')
const {requireAuth} = require('../middleware/requireAuth')

const router = express.router()

router.use(requireAuth)

router.post('/', createWorkoutSession)

router.delete('/:id', deleteWorkoutSession)

router.patch('/:id', updateWorkoutSession)

router.get('/:id', getWorkoutSession)

router.get('/', getAllWorkoutSessions)

module.exports = router