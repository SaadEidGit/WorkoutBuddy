import { createContext, useReducer } from "react";

// Used to let components pass information deep down without passing props
export const WorkoutsContext = createContext()

// state is the previous state
export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            // output the payload and the rest of the data using the spread operator
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

// The children property refers to the properties inside the component. In this case, the App component
export const WorkoutsContextProvider = ({ children }) => {
    // similar to useState, allows for custom state logic s.a. keeping track of multiple pieces of state
    const [state, dispatch] = useReducer(workoutsReducer, { workouts: null})

    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    )
}