const WorkoutPlan = require('../models/workoutPlanModel')
const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// Create a new workout plan
const createWorkoutPlan = async (req, res) => {
    const { plan_name, workouts } = req.body
    
    try {
        // Create the workout plan with the user ID from the authenticated request
        const workoutPlan = await WorkoutPlan.create({ 
            user_id: req.user._id, 
            plan_name, 
            workouts: workouts || [] 
        })

        res.status(200).json(workoutPlan)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Get all workout plans for a user
const getWorkoutPlans = async (req, res) => {
    try {
        const workoutPlans = await WorkoutPlan.find({ user_id: req.user._id })
            .populate('workouts') // Populate the workouts details

        res.status(200).json(workoutPlans)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Get a single workout plan by ID
const getWorkoutPlan = async (req, res) => {
    const { id } = req.params

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout plan' })
    }

    try {
        const workoutPlan = await WorkoutPlan.findById(id)
            .populate('workouts')

        if (!workoutPlan) {
            return res.status(404).json({ error: 'No such workout plan' })
        }

        // Ensure the workout plan belongs to the authenticated user
        if (workoutPlan.user_id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Not authorized' })
        }

        res.status(200).json(workoutPlan)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Update a workout plan
const updateWorkoutPlan = async (req, res) => {
    const { id } = req.params
    const { action, workoutId } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout plan' })
    }

    try {
        const workoutPlan = await WorkoutPlan.findById(id)

        if (!workoutPlan) {
            return res.status(404).json({ error: 'No such workout plan' })
        }

        if (workoutPlan.user_id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Not authorized' })
        }

        let updatedWorkoutPlan

        switch (action) {
            case 'ADD_WORKOUT':
                updatedWorkoutPlan = await WorkoutPlan.findByIdAndUpdate(
                    id,
                    { $push: { workouts: workoutId } },
                    { new: true }
                ).populate('workouts')
                break
            
            case 'REMOVE_WORKOUT':
                updatedWorkoutPlan = await WorkoutPlan.findByIdAndUpdate(
                    id,
                    { $pull: { workouts: workoutId } },  // Use $pull to remove from array
                    { new: true }
                ).populate('workouts')
                break
            
            default:
                // Handle other update cases (like updating plan name)
                const { plan_name } = req.body
                updatedWorkoutPlan = await WorkoutPlan.findByIdAndUpdate(
                    id,
                    { plan_name },
                    { new: true }
                ).populate('workouts')
        }
        res.status(200).json(updatedWorkoutPlan)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Delete a workout plan
const deleteWorkoutPlan = async (req, res) => {
    const { id } = req.params

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout plan' })
    }

    try {
        const workoutPlan = await WorkoutPlan.findById(id)

        if (!workoutPlan) {
            return res.status(404).json({ error: 'No such workout plan' })
        }

        // Ensure the workout plan belongs to the authenticated user
        if (workoutPlan.user_id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Not authorized' })
        }

        // Delete the workout plan
        await WorkoutPlan.findByIdAndDelete(id)

        res.status(200).json(workoutPlan)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    createWorkoutPlan,
    getWorkoutPlans,
    getWorkoutPlan,
    updateWorkoutPlan,
    deleteWorkoutPlan
}