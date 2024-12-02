const express = require('express');
const {
    createWorkoutPlan,
    getWorkoutPlans,
    getWorkoutPlan,
    updateWorkoutPlan,
    deleteWorkoutPlan
} = require('../controller/workoutPlanController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Require authentication for all workout plan routes
router.use(requireAuth);

// GET all workout plans
router.get('/', getWorkoutPlans);

// GET a single workout plan
router.get('/:id', getWorkoutPlan);

// POST a new workout plan
router.post('/', createWorkoutPlan);

// UPDATE a workout plan
router.patch('/:id', updateWorkoutPlan);

// DELETE a workout plan
router.delete('/:id', deleteWorkoutPlan);

module.exports = router;