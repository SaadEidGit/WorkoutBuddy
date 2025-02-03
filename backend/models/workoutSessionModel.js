const req = require('express/lib/request');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the workout plan schema
const workoutSessionSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    plan_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkoutPlan',
        required: true
    },
    plan_name: {
        type: String,
        required: true
    },
    workouts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Workout',
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('WorkoutSession', workoutPlanSchema);
