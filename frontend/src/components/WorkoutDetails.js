import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useWorkoutPlansContext } from "../hooks/useWorkoutPlansContext"
import { useAuthContext } from "../hooks/useAuthContext"

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout, planId }) => {
    const { dispatch: workoutsDispatch } = useWorkoutsContext()
    const { dispatch: workoutPlansDispatch } = useWorkoutPlansContext()
    const { user } = useAuthContext()
    const [newSet, setNewSet] = useState({ reps: '', weight: '' })
    const [editingSet, setEditingSet] = useState(null)
    const [editSet, setEditSet] = useState({ reps: '', weight: '' })

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

    const handleAddSet = async (e) => {
        e.preventDefault()
        
        if (!user) return

        const response = await fetch(`/api/workouts/${workout._id}/sets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(newSet)
        })

        const json = await response.json()
        console.log(json)
        if (response.ok) {
            workoutsDispatch({type: 'UPDATE_WORKOUT', payload: json})
            setNewSet({ reps: '', weight: '' }) // Reset form
        }
    }

    const handleDeleteSet = async (setIndex) => {
        if (!user) return

        const response = await fetch(`/api/workouts/${workout._id}/sets/${setIndex}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()
        if (response.ok) {
            workoutsDispatch({type: 'UPDATE_WORKOUT', payload: json})
        }
    }

    const handleEditSet = async (e) => {
        e.preventDefault()
        if (!user || editingSet === null) return

        const response = await fetch(`/api/workouts/${workout._id}/sets/${editingSet}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(editSet)
        })

        const json = await response.json()
        if (response.ok) {
            workoutsDispatch({type: 'UPDATE_WORKOUT', payload: json})
            setEditingSet(null)
            setEditSet({ reps: '', weight: '' })
        }
    }

    return (
        <div className="workout-details">
            <h4>{String(workout.title).charAt(0).toUpperCase() + String(workout.title).slice(1)}</h4>
            {/* <p><strong>Load (kg): </strong> {workout.load}</p>
            <p><strong>Reps: </strong> {workout.reps}</p> */}
            
            {/* Display sets if they exist */}
            {workout.sets && workout.sets.length > 0 && (
                <div className="sets-list">
                    <h5>Sets:</h5>
                    {workout.sets.map((set, index) => (
                        <div key={index} className="set-item">
                            <button 
                                className="delete-set-btn"
                                onClick={() => handleDeleteSet(index)}
                            >
                                ×
                            </button>
                            <p>Set {index + 1}: {set.weight}lbs × {set.reps} reps</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Add set form */}
            <form className="add-set-form" onSubmit={handleAddSet}>
                <input 
                    type="number"
                    placeholder="Weight (lbs)"
                    required
                    value={newSet.weight}
                    onChange={(e) => setNewSet({...newSet, weight: e.target.value})}
                />
                <input 
                    type="number"
                    placeholder="Reps"
                    required
                    value={newSet.reps}
                    onChange={(e) => setNewSet({...newSet, reps: e.target.value})}
                />
                <button type="submit">Add Set</button>
            </form>

            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default WorkoutDetails