import { 
    Option1ActionTypes, Option2ActionTypes, 
    Option3ActionTypes, Option4ActionTypes 
} from "./optionHeads.types"



export const fetchOption1Start = (obj) => ({
    type: Option1ActionTypes.FETCH_OPTION_HEAD_1_START,
    payload: obj
})
export const fetchOption2Start = (obj) => ({
    type: Option2ActionTypes.FETCH_OPTION_HEAD_2_START,
    payload: obj
})
export const fetchOption3Start = (obj) => ({
    type: Option3ActionTypes.FETCH_OPTION_HEAD_3_START,
    payload: obj
})
export const fetchOption4Start = (obj) => ({
    type: Option4ActionTypes.FETCH_OPTION_HEAD_4_START,
    payload: obj
})