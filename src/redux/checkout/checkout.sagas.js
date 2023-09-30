import { take, takeEvery, takeLatest, all, call, put } from "redux-saga/effects"
import { CheckoutActionTypes } from "./checkout.types"
import { 
    completeFirebaseCheckout, getPaymentOptionsFromFirebase,
    getCurrentUser, createOrFetchUserProfileDocument,
    CreateOrFetchUserTransaction, CreateOrFetchCheckout
} from "../../firebase/firebase.utils"
import {  
    paymentOptionsSuccess,
    completePaymentSuccess,
    paymentOptionsFailure,
    completePaymentFailure,
    fetchUserTransactionsSuccess,
    fetchUserTransactionsFailure,
    fetchAllCheckoutStart,
    fetchAllCheckoutSuccess,
    fetchAllCheckoutFailure,
} from "./checkout.action"
import { getBookedCodeStart, postBookingCodeStart } from "../bet/bet.action"
import { updateUSerInfo } from "../user/user.action"




class CustomError extends Error{
    constructor(msg){
        super();
        this.name = "";
        this.message= msg;
    }
}



export function* getPaymentOptionsAsync({payload}) {
    try{
        const paymentOptionsDocs = yield getPaymentOptionsFromFirebase(payload)
        if (paymentOptionsDocs.length) yield put(paymentOptionsSuccess(paymentOptionsDocs))
        else throw new CustomError('Admin have not entered payment options in database')
    } catch (error){
        yield put(paymentOptionsFailure(error.message))
    }
}
export function* completePaymentAsync({payload}) {
    try{
        const allSnapShots = yield call(completeFirebaseCheckout, payload)
        //this conditional statement $ unction is to update this user details in reducer with [mybet field] itself or an updated [mybet field]
        if (Object.keys(allSnapShots).length){
            yield put(completePaymentSuccess(allSnapShots)) 
            const userAuth =  yield getCurrentUser();
            const userRef = yield call(createOrFetchUserProfileDocument, userAuth)
            const userSnapShot = yield userRef.get()
            yield put(updateUSerInfo({id: userSnapShot.id, ...userSnapShot.data()}))
        }
    } catch (error){
        yield put(completePaymentFailure(error.message))
    }
}

export function* getAllCheckoutAsync() {
    try{
        const CheckoutDocsData = yield CreateOrFetchCheckout()
        if (typeof CheckoutDocsData !== "string"){
            yield put(fetchAllCheckoutSuccess(CheckoutDocsData))
        } else {
            const errorMsg = CheckoutDocsData
            const type = "Network Error"
            throw new CustomError({type, msg: errorMsg})
        }
    } catch (error){
        yield put(fetchAllCheckoutFailure(error.message))
    }
}
export function* getUserTransactionAsync() {
    try{
        const userAuth =  yield getCurrentUser();
        const transactionSnapShotData = yield CreateOrFetchUserTransaction(null, userAuth, null)
        if (typeof transactionSnapShotData !== "string"){
            if (transactionSnapShotData){
                yield put(fetchAllCheckoutStart())
                yield put(getBookedCodeStart({id:null, name:"coupon"}))
                yield put(fetchUserTransactionsSuccess(transactionSnapShotData))
            } else {
                const errorMsg = 'This user has no transaction'
                const type = "Field Error"
                throw new CustomError({type, msg:errorMsg})
            }
        } else {
            const errorMsg = transactionSnapShotData
            const type = "Network Error"
            throw new CustomError({type, msg: errorMsg})
        }
    } catch (error){
        yield put(fetchUserTransactionsFailure(error.message))
    }
}

export function* onFetchPaymentOptionsStart() {
    yield takeLatest(CheckoutActionTypes.PAYMENT_OPTIONS_START, 
        getPaymentOptionsAsync)
}
export function* onCompletePaymentStart() {
    yield takeLatest(CheckoutActionTypes.COMPLETE_PAYMENT_START, 
        completePaymentAsync)
}
export function* onGetAllCheckoutAsync() {
    yield takeLatest(CheckoutActionTypes.FETCH_ALL_CHECKOUT_START, 
        getAllCheckoutAsync)
}
export function* onGetUserTransactionAsync() {
    yield takeLatest(CheckoutActionTypes.FETCH_USER_TRANSACTION_START, 
        getUserTransactionAsync)
}
export function* checkoutSagas(){
    yield all([ 
        call(onFetchPaymentOptionsStart),
        call(onCompletePaymentStart),
        call(onGetAllCheckoutAsync),
        call(onGetUserTransactionAsync),
    ])
}

