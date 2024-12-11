import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useWorkoutPlansContext } from "../hooks/useWorkoutPlansContext"

import WorkoutPlanForm from '../components/WorkoutPlanForm'
import WorkoutPlanDetails from '../components/WorkoutPlanDetails'

const WorkoutPlans = () => {
    // const [workoutPlans, setWorkoutPlans] = useState(null)
    const [error, setError] = useState(null)
    const { user } = useAuthContext()
    const { workoutPlans, dispatch} = useWorkoutPlansContext()

    useEffect(() => {
        const fetchWorkoutPlans = async () => {
            if (!user) {
                setError('You must be logged in')
                return
            }

            try {
                const response = await fetch('/api/workoutplans/', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })

                const json = await response.json()
                
                if (response.ok) {
                    // setWorkoutPlans(json)
                    dispatch({type: 'SET_WORKOUT_PLAN', payload: json})
                    console.log(json)
                } else {
                    setError(json.error)
                }
            } catch (err) {
                setError('Failed to fetch workout plans')
            }
        }

        if (user) {
            fetchWorkoutPlans()
        }
    }, [dispatch, user])

    return (
        <div className="home">
            <div className="workouts">
                {workoutPlans && workoutPlans.map((workoutPlan) => (
                    <WorkoutPlanDetails key={workoutPlan._id} workoutPlan={workoutPlan}/>
                ))}
            </div>
            <WorkoutPlanForm />
        </div>
    )
}

export default WorkoutPlans