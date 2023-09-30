import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createStructuredSelector} from "reselect"; 
import { connect, useDispatch } from 'react-redux';
import { selectCurrentUser } from "../../redux/user/user.selector";
import { selectIsFetchingCheckout, selectErrorCheckout } from "../../redux/checkout/checkout.selectors";
import { fetchUserTransactionsStart } from "../../redux/checkout/checkout.action";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import MyBet from "../../components/my-bet/my-bet.components";
import { selectMyBet } from "../../redux/checkout/checkout.selectors";





const MyBetWithSpinner = WithSpinner(MyBet)
const MyBetPage = ({currentUser, errMsg, currentUser_bets, isFetching}) => {
    const { pathname } = useLocation()
    const dispatch = useDispatch()
    useEffect(() => {
        if (!currentUser_bets) 
            dispatch(fetchUserTransactionsStart())
    },[])
    // const [isLoading, setIsLoading] = useState()
    // useEffect(() => {
    //     setIsLoading(currentUser_bets ? false : true)
    // },[currentUser_bets])
    const [isClassName, setIsClassName] = useState()
    useEffect(() => {
        
        if (pathname.split("/").slice(3,).join("") ==="bet_historysport_bets"){
            setIsClassName("fullscreen-display")
        }
        else {
            setIsClassName("side-display ")
        }
    })
    
    return (
        <div className={`my-bet__page ${isClassName}`}>
            <MyBetWithSpinner isLoading={isFetching} 
                currentUser={currentUser}
                currentUser_bets={currentUser_bets}
                errMsg={errMsg}  />
        </div>
        )
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    isFetching: selectIsFetchingCheckout,
    currentUser_bets: selectMyBet,
    errMsg: selectErrorCheckout,
})
export default connect(mapStateToProps)(MyBetPage);


