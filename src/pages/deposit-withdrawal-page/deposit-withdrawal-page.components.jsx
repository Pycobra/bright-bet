import React, { useEffect } from "react";
import { createStructuredSelector} from "reselect"; 
import { connect, useDispatch } from 'react-redux';
import { selectCurrentUser } from "../../redux/user/user.selector";
import { selectIsFetchingCheckout } from "../../redux/checkout/checkout.selectors";
import { selectPaymentOptions } from "../../redux/checkout/checkout.selectors";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { paymentOptionsStart } from "../../redux/checkout/checkout.action";
import DepositWithdrawal from "../../components/deposit-withdrawal/deposit-withdrawal.components";



const DepositWithdrawalWithSpinner = WithSpinner(DepositWithdrawal)
const DepositWithdrawalPage = ({currentUser, payment_options, isFetching}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(paymentOptionsStart())
    },[])
    

    return (
            <DepositWithdrawalWithSpinner isLoading={isFetching} 
                currentUser={currentUser}
                payment_options={payment_options}  />
        )
}
const mapStateToProps = createStructuredSelector({
    payment_options: selectPaymentOptions,
    currentUser: selectCurrentUser,
    isFetching: selectIsFetchingCheckout
})
export default connect(mapStateToProps)(DepositWithdrawalPage);

// export default TransactionPage;


