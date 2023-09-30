import { UserAccumulatedBetActionTypes } from "./betAccumulator.types"



export const fetchUserAccumulatedBetStart = (obj) => ({
    type: UserAccumulatedBetActionTypes.FETCH_CURRENT_USER_PICK_START,
    payload: obj
})

export const removeUserAccumulatedBetStart = (elementID) => ({
    type: UserAccumulatedBetActionTypes.REMOVE_FROM_CURRENT_USER_PICK_START,
    payload: elementID
})
export const clearUserAccumulatedBetStart = () => ({
    type: UserAccumulatedBetActionTypes.CLEAR_CURRENT_USER_PICK_START
})
