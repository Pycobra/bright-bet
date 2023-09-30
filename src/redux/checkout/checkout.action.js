import { CheckoutActionTypes } from "./checkout.types"




export const paymentOptionsStart = () => ({
    type: CheckoutActionTypes.PAYMENT_OPTIONS_START,
})
export const paymentOptionsSuccess = (options) => ({
    type: CheckoutActionTypes.PAYMENT_OPTIONS_SUCCESS,
    payload: options
})
export const paymentOptionsFailure = (err) => ({
    type: CheckoutActionTypes.PAYMENT_OPTIONS_FAILURE,
    payload: err
})
export const completePaymentStart = (obj) => ({
    type: CheckoutActionTypes.COMPLETE_PAYMENT_START,
    payload: obj
  })
  export const completePaymentSuccess = (data) => ({
    type: CheckoutActionTypes.COMPLETE_PAYMENT_SUCCESS,
    payload: data
  })
  export const completePaymentFailure = (err) => ({
    type: CheckoutActionTypes.COMPLETE_PAYMENT_FAILURE,
    payload: err
  })
  
export const fetchUserTransactionsStart = () => ({
    type: CheckoutActionTypes.FETCH_USER_TRANSACTION_START
})
export const fetchUserTransactionsSuccess = (obj) => ({
    type: CheckoutActionTypes.FETCH_USER_TRANSACTION_SUCCESS,
    payload: obj
})
export const fetchUserTransactionsFailure = errorMessage => ({
    type: CheckoutActionTypes.FETCH_USER_TRANSACTION_FAILURE,
    payload: errorMessage
})

export const fetchAllCheckoutStart = () => ({
    type: CheckoutActionTypes.FETCH_ALL_CHECKOUT_START
})
export const fetchAllCheckoutSuccess = (obj) => ({
    type: CheckoutActionTypes.FETCH_ALL_CHECKOUT_SUCCESS,
    payload: obj
})
export const fetchAllCheckoutFailure = errorMessage => ({
    type: CheckoutActionTypes.FETCH_ALL_CHECKOUT_FAILURE,
    payload: errorMessage
})

