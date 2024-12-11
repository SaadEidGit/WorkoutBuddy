import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDipatch } = useWorkoutsContext()

    const logout = () => {
        // remove user from local storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        // clearing global workout state
        workoutsDipatch({type: 'SET_WORKOUTS', payload: null})
    }

    return {logout}
}