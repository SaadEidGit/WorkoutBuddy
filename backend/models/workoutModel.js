const mongoose = require('mongoose')

const Schema = mongoose.Schema

// define structure
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    set: [
        {
            reps: {
                type: Number
            },
            load: {
                type: Number
            }
        }
    ],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Workout', workoutSchema)
