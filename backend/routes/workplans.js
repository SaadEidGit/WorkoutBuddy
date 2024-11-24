const express = require('express')
const { getWorkoutPlanNames, getWorkoutsFromPlan, createWorkoutPlan } = require('../controller/workoutPlanController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// get all workout plan names
router.get('/:user_id', getWorkoutPlanNames)

router.get('/:plan_id/workouts', getWorkoutsFromPlan)

router.post('/', createWorkoutPlan)

module.exports = router