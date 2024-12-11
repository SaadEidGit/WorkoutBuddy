import React, { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useWorkoutPlansContext } from "../hooks/useWorkoutPlansContext"

const WorkoutPlanForm = () => {
    const [plan_name, setPlanName] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const { user } = useAuthContext()
    const {dispatch} = useWorkoutPlansContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!user) {
            setError('You must be logged in')
            return
        }

        const workoutPlan = { plan_name, workouts: [] }

        try {
            const response = await fetch('/api/workoutplans', {
                method: 'POST',
                body: JSON.stringify(workoutPlan),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })

            const json = await response.json()
            
            if (!response.ok) {
                setError(json.error)
                setEmptyFields(json.emptyFields)
                // throw new Error(json.error)
            }

            // Reset form and call optional callback
            setPlanName('')
            setError(null)
            setEmptyFields([])
            dispatch({type: 'CREATE_WORKOUT_PLAN', payload: json})
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Workout Plans</h3>

            <label>Add a New Workout Plan:</label>
            <input 
                type="text" 
                onChange={(e) => setPlanName(e.target.value)} 
                value={plan_name} 
                className={emptyFields.includes('title') ? 'error' : ''}
                required
                placeholder="Enter plan name"
                />
            <button>Create Workout Plan</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutPlanForm