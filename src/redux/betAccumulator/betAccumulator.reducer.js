import { UserAccumulatedBetActionTypes } from "./betAccumulator.types"
import { AccumulationAppender, AccumulationRemover } from "./betAccumulator.utils"


const INITIAL_STATE = {
    isFetching: false,
    user_accumulated_bet: [],
}

const AccumulatedBetReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case UserAccumulatedBetActionTypes.FETCH_CURRENT_USER_PICK_START:
            return{
                ...state,
                isFetching: true,
                user_accumulated_bet: AccumulationAppender(action.payload, state.user_accumulated_bet)
            }
        case UserAccumulatedBetActionTypes.REMOVE_FROM_CURRENT_USER_PICK_START:
            return{
                ...state,
                isFetching: true,
                user_accumulated_bet: AccumulationRemover(action.payload, state.user_accumulated_bet)
            }
        case UserAccumulatedBetActionTypes.CLEAR_CURRENT_USER_PICK_START:
            return{
                ...state,
                isFetching: true,
                user_accumulated_bet: []
            }
        default:
            return state
    }
}
 
export default AccumulatedBetReducer;





