const express = require('express')
const { getWorkoutPlanNames, getWorkoutsFromPlan, createWorkoutPlan, addWorkoutToPlan } = require('../controller/workoutPlanController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// add user_id as query param
router.get('', getWorkoutPlanNames)

// add plan_id from user
router.get('/:plan_id/workouts', getWorkoutsFromPlan)

router.post('/', createWorkoutPlan)

router.post('/:plan_id/workouts/:workout_id', addWorkoutToPlan);

module.exports = router