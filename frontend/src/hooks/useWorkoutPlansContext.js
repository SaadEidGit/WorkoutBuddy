import { WorkoutPlansContext } from "../context/WorkoutPlanContext";
import { useContext } from "react";

export const useWorkoutPlansContext = () => {
    const context = useContext(WorkoutPlansContext)

    if (!context){
        throw Error('useWorkoutPlansContext must be used inside a WorkoutPlansContextProvider')
    }

    return context
}