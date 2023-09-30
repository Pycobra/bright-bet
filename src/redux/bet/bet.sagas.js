import { take, takeEvery, takeLatest, all, call, put } from "redux-saga/effects"
import { BetActionTypes } from "./bet.types"
import { 
    postBookingCodeDocument,
    postCouponDocument,
    getBookingCodeFromFirebase,
    CreateOrFetchUserTransaction 
} from "../../firebase/firebase.utils"
import {  
    betFrameHidden,
    postBetFailure,
    postBetSuccess,
    // bookedCodeExistStart,
    getBookedCodeStart,
    getBookedCodeSuccess,
    getBookedCodeFailure,
    // getCouponIDStart,
    getCouponIDSuccess,
    getCouponIDFailure,
} from "./bet.action"
import { updateUSerInfo } from "../user/user.action"

class CustomError extends Error{
    constructor(msg){
        super();
        this.name = "";
        this.message= msg;
    }
}


export function* getBookingCodeAsync({payload}) {
    const {id, name, couponID} = payload
    try{
        const bookingSnapShot = yield getBookingCodeFromFirebase(id)
        console.log(bookingSnapShot, "kk5k6kk")
        if (typeof bookingSnapShot !== "string"){
            if (!bookingSnapShot.exists && id) {
                const errorMsg = 'Booking not found'
                const type = "Field Error"
                throw new CustomError({type, msg:errorMsg})
            } else {
                if (name==='booking'){
                    yield put(getBookedCodeSuccess(bookingSnapShot.data()))
                }
                if (name==='coupon'){
                    if (id) {
                        var bookingDetails = bookingSnapShot.data()
                        bookingDetails['bookingCode'] = id
                        bookingDetails['couponID'] = couponID
                        const data = {
                            boolean: true, 
                            actionStr: "coupon check",
                            dataContent: bookingDetails
                        }
                        yield put(betFrameHidden(data))
                    } else {
                        var bookingDetails = bookingSnapShot.docs
                    }
                    yield put(getCouponIDSuccess(bookingDetails))
                }
            }
        } else {
            const errorMsg = bookingSnapShot
            const type = "Network Error"
            throw new CustomError({type, msg:errorMsg})
        }
    } catch (error){
        yield put(getBookedCodeFailure(error.message))
    }
}
export function* getCouponIdAsync({payload}) {
    const {id, name} = payload
    try{
        const transactionData = yield CreateOrFetchUserTransaction(null, null, id)
        console.log(transactionData)
        if (transactionData && Object.keys(transactionData).length 
            && typeof transactionData !== "string"){
            const { bookingCode } = transactionData
            yield getBookingCodeAsync(
                {payload: {id:bookingCode, couponID:id, name}}
            )
        } else {
            const errorMsg = typeof transactionData === "string" ? transactionData : "Coupon not found"
            const type = typeof transactionData === "string" ? "Network Error" : "Field Error"
            throw new CustomError({type, msg: errorMsg})
        }
    } catch (error){
        yield put(getCouponIDFailure(error.message))

    }
}



export function* postBetAsync({payload}) {
    const {dataContent, actionStr} = payload
    try{
        const bookingSnapShot = yield getBookingCodeFromFirebase(dataContent.bookingCode)
        
        if (typeof bookingSnapShot !== "string"){
            if (bookingSnapShot.exists) {
                console.log("Booking code already exist so we are searching for another")
            }
            else{        
                yield call(postBookingCodeDocument, dataContent)
                if (actionStr === 'Place A Bet') {
                    const data = yield call(postCouponDocument, dataContent)
                    yield put(updateUSerInfo(data))
                }
                yield put(postBetSuccess(payload))
                yield put(betFrameHidden(payload))
                
            }
        } else {
            const errorMsg = bookingSnapShot
            throw new CustomError({'type': 'Network Error', msg: errorMsg})
        }
        
    } catch (error){
        if (error.message.type === "Field Error")
            yield put(postBetFailure(error.message))
        else if (error.message.type === "Network Error")
            alert(error.message.msg)
    }
}







export function* onPostBetStart() {
    yield takeLatest(BetActionTypes.POST_BET_START, 
        postBetAsync)
}
export function* onGetBookingCodeStart() {
    yield takeLatest(BetActionTypes.FETCH_BOOKED_CODE_START, 
        getBookingCodeAsync)
}
export function* onGetCouponIdStart() {
    yield takeLatest(BetActionTypes.FETCH_COUPON_ID_START, 
        getCouponIdAsync)
}
export function* betSagas(){
    yield all([ 
        call(onPostBetStart),
        call(onGetBookingCodeStart),
        call(onGetCouponIdStart),
    ])
}






