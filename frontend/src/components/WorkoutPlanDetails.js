import { useWorkoutPlansContext } from "../hooks/useWorkoutPlansContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutPlanDetails = ({ workoutPlan }) => {
    const {dispatch} = useWorkoutPlansContext()
    const {user} = useAuthContext()
    const navigate = useNavigate()

    const handleDelete = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        const response =  await fetch('api/workoutplans/' + workoutPlan._id, {
            method: 'DELETE',
            headers: { 
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type:'DELETE_WORKOUT_PLAN', payload: json})
        }
    }

    const handleDivClick = () => {
        console.log('navigate')
        navigate(`/workouts/${workoutPlan._id}`) 
    }

    if (!workoutPlan){
        return null
    }

    return (
        <div className="workout-details">
            <div className="workout-plan-header" onClick={handleDivClick}>
                <h4>{workoutPlan.plan_name}</h4>
                <p><strong>{workoutPlan.workouts.length} Workout{workoutPlan.workouts.length !== 1 ? 's' : ''}</strong></p>
                
                {/* Add workout titles list */}
                <div className="workout-titles">
                    {workoutPlan.workouts.map((workout, index) => (
                        <p key={index} className="workout-title">{index + 1}. {workout.title}</p>
                    ))}
                </div>

                <p>{formatDistanceToNow(new Date(workoutPlan.createdAt), { addSuffix: true})}</p>
                <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
            </div>
        </div>
    )
}

export default WorkoutPlanDetails