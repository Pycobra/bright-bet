import { 
    Option1ActionTypes, Option2ActionTypes, 
    Option3ActionTypes, Option4ActionTypes 
} from "./optionHeads.types"



const INITIAL_STATE = {
    option1_state: [],
    option2_state: [],
    option3_state: [],
    option4_state: [],
}

const Option3Reducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case Option1ActionTypes.FETCH_OPTION_HEAD_1_START:
            return{
                ...state,
                isFetching: true,
                option1_state: action.payload
            }
        case Option2ActionTypes.FETCH_OPTION_HEAD_2_START:
            return{
                ...state,
                isFetching: true,
                option2_state: action.payload
            }
        case Option3ActionTypes.FETCH_OPTION_HEAD_3_START:
            return{
                ...state,
                isFetching: true,
                option3_state: action.payload
            }
        case Option4ActionTypes.FETCH_OPTION_HEAD_4_START:
            return{
                ...state,
                isFetching: true,
                option4_state: action.payload
            }
        default:
            return state
    }
}
 
export default Option3Reducer;





