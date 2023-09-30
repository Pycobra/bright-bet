import { createSelector } from "reselect";
import { Timestamp } from 'firebase/firestore'
import { selectCouponID } from "../bet/bet.selectors";

const selectCheckout = state => state.checkout
export const selectAllCheckout = createSelector(
    [selectCheckout],
    (checkout) => checkout
)
export const selectIsFetchingCheckout = createSelector(
    [selectAllCheckout],
    (checkout) => checkout.isFetching
)
export const selectPaymentOptions = createSelector(
    [selectAllCheckout],
    (checkout) => checkout.paymentOptions
)
export const selectCheckoutDetails = createSelector(
    [selectAllCheckout],
    (checkout) => checkout.checkout_details
)
export const selectErrorCheckout = createSelector(
    [selectAllCheckout],
    (checkout) => checkout.errorMessage
)
export const selectUserTransaction = createSelector(
    [selectAllCheckout, selectCheckoutDetails],
    (checkout, checkout_details) => {
        if (checkout.user_transactions && checkout_details) {
            return  Object.keys(checkout.user_transactions).map(id => {
                if (id){
                    const userTransactions = checkout.user_transactions[`${id}`]
                    //in trying to transfer ref from checout table to transactions table 
                    //Bet-Sports dont have data in checkout table so we use betslipID directly
                    const transaction = checkout_details.find(i => i.transactionId===id)
                    userTransactions['ref'] = transaction ? transaction.ref : id
                    const date = new Date(parseInt(`${userTransactions.createdAt}`.split("=")[1]
                                        .split(", nanoseconds")[0]) * 1000)
                    userTransactions['transactionDate'] = `${date}`.slice(0, 24)
                    return userTransactions
                }
            }).sort((itemA, itemB) => Number(itemB.updatedAt) - Number(itemA.updatedAt))
        }
         

    }
)

export const selectMyBet = createSelector(
    [selectUserTransaction, selectCouponID],
    (transaction, all_coupon) => {
        if (transaction && all_coupon) {
            return transaction.map(item => {
                const bookingCode = item['bookingCode']
                const createdAt = item['createdAt']
                const bookedGame = all_coupon.find(i => i.id===bookingCode)
                return bookedGame ? {bookedMatch:bookedGame.data(), id:bookingCode, createdAt} : null
            }).filter(i => i)
        }
         

    }
)


