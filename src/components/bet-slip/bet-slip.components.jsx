import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./bet-slip.styles.css";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import CheckBoxInput from "../checkbox-input/checkbox-input.component";
import BookingBetslipFooter from "../booking-betslip-footer/booking-betslip-footer.components";
import BookingBetslip from "../booking-betslip/booking-betslip.components";
import { selectAllAccumulatedBet } from "../../redux/betAccumulator/betAccumulator.selectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { clearUserAccumulatedBetStart } from "../../redux/betAccumulator/betAccumulator.action";
import { getCouponIDStart, getBookedCodeStart } from "../../redux/bet/bet.action";
import { 
    selectBookingCode, selectCouponID, 
    selectIsFetching2, selectErrMsg,
    selectIsFetching3 
} from "../../redux/bet/bet.selectors";
import { fetchUserAccumulatedBetStart } from "../../redux/betAccumulator/betAccumulator.action";
import WithButtonSpinner from "../with-button-spinner/with-button-spinner.component";





const BetSlip = ({}) => {
    const userAccumulatedBet = useSelector(selectAllAccumulatedBet)
    const { user_accumulated_bet } = userAccumulatedBet
    const dispatch = useDispatch()  
    const clearGame = () => {
        dispatch(clearUserAccumulatedBetStart())   
    }
    const HandleClick = (e) => {
        document.querySelector('.content.system > .s-nav__head-text.active-span').classList.remove('active-span')
        e.target.closest('.s-nav__head-text').classList.add('active-span')
    }
    const [bookingCode, setBookingCode] = useState('')
    const [couponID, setCouponID] = useState('')
    const handleChange = (e) => {
        const {value, name} = e.target
        if (name==='booking'){
            setBookingCode(value)
        } else if (name==='coupon'){
            setCouponID(value)
        }
    }

    const errorMsg = useSelector(selectErrMsg)
    const booking_code_obj = useSelector(selectBookingCode)
    const coupon_id_obj = useSelector(selectCouponID)
    const isFetching2 = useSelector(selectIsFetching2)
    const isFetching3 = useSelector(selectIsFetching3)
    const handleSubmit = (e) => {
        e.preventDefault()
        const {name} = e.target.querySelector('input')
        if (name==='booking'){
            dispatch(getBookedCodeStart({id:bookingCode, name})) 
        } else if (name==='coupon'){
            dispatch(getCouponIDStart({id:couponID, name})) 
        }

    }

    const [fieldError, setFieldError] = useState(null)
    useEffect(() => {
        if (errorMsg){
            if (errorMsg.type==="Network Error"){
                alert(errorMsg.msg)
            } else if(errorMsg.type==="Field Error"){
                setFieldError(errorMsg.msg)
            }
        }
    }, [errorMsg])
    useEffect(() => {
        if (booking_code_obj){
            booking_code_obj.user_accumulated_bet.map(i => 
                dispatch(fetchUserAccumulatedBetStart(i))
            )
        }
    }, [booking_code_obj])

    return (
        <div className="betslip-body">
            <div className="s-nav__item">
                <div className="container">
                    <div className="s-nav__head-row">
                        <div onClick={e => HandleClick(e)} className="content system">
                            <span className="s-nav__head-text active-span"><span>Singles</span></span>
                            <span className="s-nav__head-text"><span>Multiples</span></span>
                        </div>
                    </div>
                    <div className="s-nav__head-row">
                        <div className="content">
                            <div className="s-nav__head-col">
                                <CheckBoxInput inputType='CHECKBOX2'/>
                                <span className="text-active">Accept Odds Changes</span>
                            </div>
                            <div className="s-nav__head-col" onClick={e => clearGame()}>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            <div className="s-nav__item">
                {
                    !user_accumulated_bet.length
                    ? <div className="content">
                        <div className="s-nav__item-row u">
                            <span>Your Betslip is empty</span>
                            <span>Please make one or more selection in order to place a bet</span>
                        </div>
                        <div className="s-nav__item-row form">
                            <span>Book:</span>
                            <span>Please insert a booking number below</span>
                            <form onSubmit={handleSubmit}>
                                <FormInput name='booking' type='text' value={bookingCode} required
                                    onChange={e => handleChange(e)} inputtype='SearchInputType2'/>
                                <div className="field">
                                    <CustomButton name='booking' isFetching={isFetching3} 
                                        style={{fontWeight:'bold'}} 
                                        buttonType="FlatButton">
                                        {
                                            isFetching3
                                            ? <WithButtonSpinner 
                                                elemStr="miniscreen" 
                                                widthAndHeight="9"  
                                                borderColor="3px solid var(--green2)" 
                                                topBorderColor="var(--default)"/>
                                            : null
                                        }
                                        <span style={{color:"var(--black)"}}>Book</span>
                                    </CustomButton>
                                </div>
                                {
                                    fieldError === "Booking not found" 
                                    ? <span className="error">
                                        {fieldError}
                                        </span>
                                    : null
                                }
                            </form>
                        </div>
                        <div className="s-nav__item-row form">
                            <span>Check Bet:</span>
                            <span>Insert a valid bet ID to check status</span>
                            <form onSubmit={handleSubmit}>
                                <FormInput name='coupon' type='text' value={couponID} required
                                    onChange={e => handleChange(e)} inputtype='SearchInputType2'/>
                                <div className="field">
                                    <CustomButton name='coupon' isFetching={isFetching2} style={{fontWeight:'bold'}} 
                                        buttonType="FlatButton">
                                        {
                                            isFetching2
                                            ? <WithButtonSpinner 
                                                elemStr="miniscreen" 
                                                widthAndHeight="9"  
                                                borderColor="3px solid var(--green2)" 
                                                topBorderColor="var(--default)"/>
                                            : null
                                        }
                                        <span style={{color:"var(--black)"}}>Check</span>
                                    </CustomButton>
                                </div>
                                {
                                    fieldError === "Coupon not found" 
                                    ? <span className="error">
                                        {fieldError}
                                        </span>
                                    : null
                                }
                            </form>
                        </div>
                    </div>
                    : null
                }
            </div>
            
            {
                user_accumulated_bet.length
                ? <div className="s-nav__item"><BookingBetslip /></div>
                : null 
            }
            {
                user_accumulated_bet.length
                ? <div className="s-nav__item"><BookingBetslipFooter /></div>
                : null 
            }
        </div>
    )
}

export default BetSlip;


































