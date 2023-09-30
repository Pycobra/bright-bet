import { call, all } from "redux-saga/effects"
import { userSagas } from "./user/user.sagas"
import { betSagas } from "./bet/bet.sagas"
import { checkoutSagas } from "./checkout/checkout.sagas"


// call is a command to call function instead of calling by ourselve else.g fetchCollectionsStart()
// all is similar to takevery, it make all saga run concurrently each time its called...
//...else if each saga is writen one by one with yield, rootSaga ll folow d normal generator func behaviour
export default function* rootSaga(){
    yield all([
        call(userSagas), 
        call(betSagas),  
        call(checkoutSagas),
    ])
}
