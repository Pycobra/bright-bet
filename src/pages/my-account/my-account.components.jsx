import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./my-account.styles.css";
import { createStructuredSelector} from "reselect"; 
import { connect, useDispatch } from 'react-redux';
import MyBetPage from "../mybetpage/mybetpage.components";
import TransactionPage from "../transactionPage/transactionPage.components";
import AccountSetting from "../account-setting/account-setting.components";
import DepositWithdrawalPage from "../deposit-withdrawal-page/deposit-withdrawal-page.components";






const MyAccount = ({currentUser}) => {

    return (
            <div className="my-account">
                <div className="my-account__content">
                    <Routes>
                        <Route path='/account-setting' element={<AccountSetting />} /> 
                        <Route path='/transaction' element={<TransactionPage />} />    
                        <Route path='/deposit-and-withdrawal' element={<DepositWithdrawalPage />} />   
                        <Route path='/bet_history/sport_bets' element={<MyBetPage />} />    
                        {/* <Route 
                          path='/:userID/transaction' 
                          element={currentUser ? <Transaction  /> : <Navigate to="/" replace />}  />             */}
                    </Routes>
                </div>
            </div>
    )
}
const mapStateToProps = createStructuredSelector({
    // currentUser: selectCurrentUser,
    // error_msg: selectErrorMsg,
    // success_msg: selectSuccessMsg,
    // isFetching: selectIsFetchingUser,
})
export default connect(mapStateToProps)(MyAccount);


