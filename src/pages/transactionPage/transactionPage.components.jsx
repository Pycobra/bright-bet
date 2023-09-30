import React, { useState, useEffect, useRef } from "react";
import { createStructuredSelector} from "reselect"; 
import { connect, useDispatch } from 'react-redux';
import { selectCurrentUser } from "../../redux/user/user.selector";
import { selectUserTransaction, selectIsFetchingCheckout, selectErrorCheckout } from "../../redux/checkout/checkout.selectors";
import { fetchUserTransactionsStart } from "../../redux/checkout/checkout.action";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import Transaction from "../../components/transaction/transaction.components";



const TransactionWithSpinner = WithSpinner(Transaction)
const TransactionPage = ({currentUser, transactions, errMsg, isFetching}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        if (!transactions) 
            dispatch(fetchUserTransactionsStart())
    },[])
    // const [isLoading, setIsLoading] = useState()
    // useEffect(() => {
    //     setIsLoading(transactions ? false : true)
    // },[transactions])
    
    return (
            <TransactionWithSpinner isLoading={isFetching} 
                currentUser={currentUser}
                transactions={transactions}
                errMsg={errMsg}  />
        )
}
const mapStateToProps = createStructuredSelector({
    transactions: selectUserTransaction,
    currentUser: selectCurrentUser,
    errMsg: selectErrorCheckout,
    isFetching: selectIsFetchingCheckout
})
export default connect(mapStateToProps)(TransactionPage);

// export default TransactionPage;


