const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    // getting the user_id from the jwt token
    const workouts = await Workout.find({user_id: req.user._id}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }
    const workout = await Workout.findById(id)

    if (!workout){
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

// create new workout
const createWorkout = async (req, res) => {
    const {title} = req.body

    if (!title){
        return res.status(400).json({error: 'Please fill in the title field!'})
    }

    try {
        const user_id = req.user._id
        //storing the response of the document we create
        const workout = await Workout.create({title, user_id})

        // return status 200 (OK) and the workout document
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout){
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body // spreads the propeties of the object
    })

    if (!workout){
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

const updateSet = async (req, res) => {
    const { workoutId, setIndex } = req.params  // Get workoutId and setIndex from params
    const { reps, load } = req.body  // Get the new reps and load values from the request body

    try {
        // Find the workout by ID
        const workout = await Workout.findById(workoutId)

        // Check if the workout exists
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' })
        }

        // Check if the set index is valid
        if (setIndex < 0 || setIndex >= workout.sets.length) {
            return res.status(400).json({ error: 'Invalid set index' })
        }

        // Update the specific set
        workout.sets[setIndex] = { reps, load }

        // Save the updated workout
        await workout.save()

        res.status(200).json(workout)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Delete a specific set from a workout
const deleteSet = async (req, res) => {
    const { workoutId, setIndex } = req.params  // Get workoutId and setIndex from params

    try {
        // Find the workout by ID
        const workout = await Workout.findById(workoutId)

        // Check if the workout exists
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' })
        }

        // Check if the set index is valid
        if (setIndex < 0 || setIndex >= workout.sets.length) {
            return res.status(400).json({ error: 'Invalid set index' })
        }

        // Remove the set at the specified index
        workout.sets.splice(setIndex, 1)

        // Save the updated workout
        await workout.save()

        res.status(200).json(workout)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout,
    updateSet,
    deleteSet
}