import { useEffect, useState} from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { useParams } from 'react-router-dom'

import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

// Workout page
const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()
    const { planId } = useParams()
    const [planName, setPlanName] = useState('')

    // The first argument is the function that is going to be called when the component is rendered
    // The second argument is the dependencies. If we want to fire the function once, then put an empty array []
    // Note you don't want the function of the UseEffect to be async but it can have another function inside of it that can be async
    useEffect(() => {
        const fetchWorkouts = async () => {
            const url = planId 
                ? `/api/workoutplans?planId=${planId}`
                : '/api/workoutplans'

            const response = await fetch(url, {
                headers: {'Authorization': `Bearer ${user.token}`}
            })
            const json = await response.json()
            console.log('json')
            console.log(json)
            
            if (response.ok){
                setPlanName(json[0].plan_name)
                dispatch({type: 'SET_WORKOUTS', payload: json[0].workouts})
            }
        }

        if (user){
            fetchWorkouts()
        }
        
    }, [dispatch, user])

    return (
        <div>
            <h2>{planName} Workout Plan</h2>
            <div className="home">
                <div className="workouts">
                    {workouts && workouts.map((workout) => (
                        <WorkoutDetails 
                            key={workout._id} 
                            workout={workout}
                            planId={planId}
                        />
                    ))}
                </div>
                <WorkoutForm planId={planId}/>
            </div>
        </div>
    )
}

export default Home