const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the workout plan schema
const workoutPlanSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    workouts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Workout',
        }
    ],
    plan_name: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('WorkoutPlan', workoutPlanSchema);
