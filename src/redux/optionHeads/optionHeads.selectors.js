import { createSelector } from "reselect";



const selectOptions = state => state.option3
export const selectOption1 = createSelector(
    [selectOptions],
    (options) => options.option1_state
    
)
export const selectOption2 = createSelector(
    [selectOptions],
    (options) => options.option2_state
    
)
export const selectOption3 = createSelector(
    [selectOptions],
    (options) => options.option3_state
    
)
export const selectOption4 = createSelector(
    [selectOptions],
    (options) => options.option4_state
)