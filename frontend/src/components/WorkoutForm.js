import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useWorkoutPlansContext } from "../hooks/useWorkoutPlansContext"
import { useAuthContext } from "../hooks/useAuthContext"
const { useState } = require("react")

const WorkoutForm = ({ planId }) => {
    const { dispatch: workoutsDispatch } = useWorkoutsContext()
    const { dispatch: workoutPlansDispatch } = useWorkoutPlansContext()
    const { user } = useAuthContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        // create the workout
        const workout = {title, load, reps}
        const workoutResponse = await fetch('/api/workouts', {
            method: 'POST', 
            body: JSON.stringify(workout), 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const workoutJson = await workoutResponse.json()

        if (!workoutResponse.ok) {
            setError(workoutJson.error)
            setEmptyFields(workoutJson.emptyFields)
            return
        }

        // update the workout plan with the new workout
        const updatePlanResponse = await fetch(`/api/workoutplans/${planId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                action: 'ADD_WORKOUT',  // Specify the action
                workoutId: workoutJson._id  // Send the new workout ID
            })
        })

        const planJson = await updatePlanResponse.json()

        if (!updatePlanResponse.ok) {
            setError('Failed to add workout to plan')
            return
        }

        // 3. If everything is successful, update state and reset form
        setError(null)
        setTitle('')
        setLoad('')
        setReps('')
        setEmptyFields([])
        workoutsDispatch({type: 'CREATE_WORKOUT', payload: workoutJson})
        workoutPlansDispatch({type: 'UPDATE_WORKOUT_PLAN', payload: planJson})
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input 
                type="text" 
                onChange={(e) => setTitle(e.target.value)} 
                value={title} 
                className={emptyFields.includes('title') ? 'error' : ''}
            />
            <label>Load (in kg):</label>
            <input 
                type="number" 
                onChange={(e) => setLoad(e.target.value)} 
                value={load} 
                className={emptyFields.includes('load') ? 'error' : ''}
            />
            <label>Reps:</label>
            <input 
                type="number" 
                onChange={(e) => setReps(e.target.value)} 
                value={reps} 
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm