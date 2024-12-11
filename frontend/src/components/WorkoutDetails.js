import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useWorkoutPlansContext } from "../hooks/useWorkoutPlansContext"
import { useAuthContext } from "../hooks/useAuthContext"

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout, planId }) => {
    const { dispatch: workoutsDispatch } = useWorkoutsContext()
    const { dispatch: workoutPlansDispatch } = useWorkoutPlansContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }

        // 1. Delete the workout
        const workoutResponse = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: { 
                'Authorization': `Bearer ${user.token}`
            }
        })
        const workoutJson = await workoutResponse.json()

        if (workoutResponse.ok) {
            // 2. Remove workout from the plan
            const planResponse = await fetch(`/api/workoutplans/${planId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    action: 'REMOVE_WORKOUT',
                    workoutId: workout._id
                })
            })

            const planJson = await planResponse.json()
            console.log(planJson)
            if (planResponse.ok) {
                workoutsDispatch({type: 'DELETE_WORKOUT', payload: workoutJson})
                workoutPlansDispatch({type: 'UPDATE_WORKOUT_PLAN', payload: planJson})
            }
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong> {workout.load}</p>
            <p><strong>Reps: </strong> {workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default WorkoutDetails