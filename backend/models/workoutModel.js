const mongoose = require('mongoose')

const Schema = mongoose.Schema

// define structure
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    // reps: {
    //     type: Number,
    //     required: true
    // },
    // load: {
    //     type: Number,
    //     required: true
    // },
    sets: [{
        reps: Number,
        weight: Number
    }],
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Workout', workoutSchema)
