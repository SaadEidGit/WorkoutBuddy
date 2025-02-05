const WorkoutSession = require('../models/workoutSessionModel')
const WorkoutPlan = require('../models/workoutPlanModel')
const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// Create Session
const createWorkoutSession = async (req, res) => {
    const {plan_name, workouts} = req.body

    try {
        const workoutSession = await WorkoutSession.create({
            user_id: req.user._id,
            plan_name,
            workouts: workouts || []
        })
    
        return res.status(200).json(workoutSession)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

// Delete Session with session id
const deleteWorkoutSession = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json('No such workout session')
    }

    try {
        const workoutSession = await WorkoutSession.findById(id)

        if (!workoutSession){
            res.status(404).json({error : 'No such workout session'})
        }

        if (workoutSession.user_id.toString() !== req.body.user._id.toString()){
            return res.status(403).json({ error: 'Not authorized' })
        }

        //await WorkoutSession.deleteOne(workoutSession)
        await WorkoutSession.findByIdAndDelete(id)

        return res.status(200).json(workoutSession)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Update Session
const updateWorkoutSession = async (req, res) => {
    const { id } = req.params
    const {workouts} = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout sesion' })
    }

    try {
        const workoutSession = await WorkoutSession.findById(id)

        if (!workoutSession){
            return res.status(404).json({ error: 'No such workout sesion' })
        }

        if (workoutSession.user_id.toString() !== req.user._id.toString()){
            return res.status(403).json({ error: 'Not authorized' })
        }

        const updatedSession = await WorkoutSession.findByIdAndUpdate(
            id,
            {workouts: workouts}
        ).populate('workouts')

        return res.status(200).json(updatedSession)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

// Get Session using session id
const getWorkoutSession = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error : 'No such workout session' })
    }

    try{
        const workoutSession = await WorkoutSession.findById(id).populate('workouts')

        if (!workoutSession){
            return res.status(404).json({ error : 'No such workout session' })
        }

        // Ensure the workout plan belongs to the authenticated user
        if (workoutSession.user_id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Not authorized' })
        }

        return res.status(200).json(workoutSession)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

// Get All Sessions using user id
const getAllWorkoutSessions = async (req, res) => {
    try {
        const workoutSessions = await WorkoutSession.find({user_id: req.user._id}).populate('workouts')
        return res.status(200).json(workoutSessions)
    } catch (error) {
        res.status(400).json({error : 'No such sessions'})
    }
}

module.exports = {
    createWorkoutSession,
    deleteWorkoutSession,
    updateWorkoutSession,
    getWorkoutSession,
    getAllWorkoutSessions
}