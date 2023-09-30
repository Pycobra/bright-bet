import { CheckoutActionTypes } from './checkout.types';



const INITIAL_STATE = {
    isFetching: false,
    paymentOptions: [],
    user_transactions: null,
    checkout_details: undefined,
    errorMessage: undefined,
}

const checkoutReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CheckoutActionTypes.PAYMENT_OPTIONS_START:
        case CheckoutActionTypes.COMPLETE_PAYMENT_START:
        case CheckoutActionTypes.FETCH_USER_TRANSACTION_START:
        case CheckoutActionTypes.FETCH_ALL_CHECKOUT_START:
            return{
                ...state,
                isFetching: true,
            }
        case CheckoutActionTypes.PAYMENT_OPTIONS_SUCCESS:
            return{
                ...state,
                isFetching: false,
                paymentOptions: action.payload
            }
        case CheckoutActionTypes.COMPLETE_PAYMENT_SUCCESS:
            return{
                ...state,
                isFetching: false,
                checkout_details: action.payload.CheckoutDocsData,
                user_transactions: action.payload.transactionSnapShotData,
            }
        case CheckoutActionTypes.FETCH_USER_TRANSACTION_SUCCESS:
            return{
                ...state,
                isFetching: false,
                user_transactions: action.payload
            }
        case CheckoutActionTypes.FETCH_ALL_CHECKOUT_SUCCESS:
            return{
                ...state,
                isFetching: false,
                checkout_details: action.payload
            }
        case CheckoutActionTypes.FETCH_USER_TRANSACTION_FAILURE:
        case CheckoutActionTypes.PAYMENT_OPTIONS_FAILURE:
        case CheckoutActionTypes.FETCH_ALL_CHECKOUT_FAILURE:
            return{
                ...state,
                isFetching: false,
                errorMessage: action.payload,
            }
        case CheckoutActionTypes.COMPLETE_PAYMENT_FAILURE:
            return{
                ...state,
                isFetching: false,
                errorMessage: action.payload,
            }
        default:
            return state
    }
}
 
export default checkoutReducer;