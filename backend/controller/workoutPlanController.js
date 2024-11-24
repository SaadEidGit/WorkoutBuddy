const mongoose = require('mongoose')
const WorkoutPlan = require('../models/workoutPlanModel')
const Workout = require('../models/workoutModel');

const getWorkoutPlanNames = async (req, res) => {
    try {
        const {user_id} = req.params

        // Validate user_id
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
    
        const workoutPlans = await WorkoutPlan.find({ user_id }, 'plan_name' )
        res.status(200).json(workoutPlans)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getWorkoutsFromPlan = async (req, res) => {
    try {
        const { plan_id } = req.params

        // Validate plan_id
        if (!mongoose.Types.ObjectId.isValid(plan_id)) {
            return res.status(400).json({ error: 'Invalid workout plan ID' })
        }

        // Find the workout plan and populate the workouts
        const workoutPlan = await WorkoutPlan.findById(plan_id).populate('workouts')

        if (!workoutPlan) {
            return res.status(404).json({ error: 'Workout plan not found' })
        }

        // Return the workouts from the plan
        res.status(200).json(workoutPlan.workouts)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const createWorkoutPlan = async (req, res) => {
    const { user_id, workouts, plan_name } = req.body
    console.log('CreateWorkoutPlan')
    try {
        // validate input
        if (! user_id ){
            return res.status(400).json({ error: 'User ID is required'})
        }

        if (workouts && !Array.isArray(workouts)) {
            return res.status(400).json({ error: 'Workouts must be an array of IDs' });
        }

        const workoutPlan = new WorkoutPlan({
            user_id,
            workouts,
            plan_name
        })

        const savedPlan = await workoutPlan.save()
        res.status(200).json(savedPlan)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to create workoutplan' })
    }
}

module.exports = {
    getWorkoutPlanNames,
    getWorkoutsFromPlan,
    createWorkoutPlan
}