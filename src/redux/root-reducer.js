import {combineReducers} from "redux"
import betReducer from "./bet/bet.reducer"
import userReducer from "./user/user.reducer"
import checkoutReducer from "./checkout/checkout.reducer"
import Option3Reducer from "./optionHeads/optionHeads.reducer"
import AccumulatedBetReducer from "./betAccumulator/betAccumulator.reducer"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"



const persistConfig = {
    key: "root",
    storage,
    whitelist: ['accumulatedBet',]
}

const rootReducer = combineReducers({
    bet: betReducer,
    accumulatedBet: AccumulatedBetReducer,
    option3: Option3Reducer,
    user: userReducer,
    checkout: checkoutReducer,
})

export default persistReducer(persistConfig, rootReducer);




