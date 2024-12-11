import { createContext, useReducer } from "react";

// Used to let components pass information deep down without passing props
export const WorkoutPlansContext = createContext()

// state is the previous state
export const workoutPlansReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUT_PLAN':
            return {
                workoutPlans: action.payload
            }
        case 'CREATE_WORKOUT_PLAN':
            // output the payload and the rest of the data using the spread operator
            return {
                workoutPlans: [action.payload, ...state.workoutPlans]
            }
        case 'DELETE_WORKOUT_PLAN':
            return {
                workoutPlans: state.workoutPlans.filter((w) => w._id !== action.payload._id)
            }
        case 'UPDATE_WORKOUT_PLAN':
            return {
                workoutPlans: state.workoutPlans.map(plan => 
                    plan._id === action.payload._id ? action.payload : plan
                )
            }
        default:
            return state
    }
}

// The children property refers to the properties inside the component. In this case, the App component
export const WorkoutPlansContextProvider = ({ children }) => {
    // similar to useState, allows for custom state logic s.a. keeping track of multiple pieces of state
    const [state, dispatch] = useReducer(workoutPlansReducer, { workoutPlans: []})

    return (
        <WorkoutPlansContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutPlansContext.Provider>
    )
}