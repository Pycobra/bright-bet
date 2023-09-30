import { createSelector } from "reselect";



const selectBet = state => state.accumulatedBet
export const selectAllAccumulatedBet = createSelector(
    [selectBet],
    (bet) => bet
    
)