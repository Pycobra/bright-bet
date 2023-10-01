import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./booking-betslip-footer.styles.css";
import {loginFrameHiddenStart} from "../../redux/user/user.action";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { selectAllAccumulatedBet } from "../../redux/betAccumulator/betAccumulator.selectors";
import { postBetStart } from "../../redux/bet/bet.action";
import { selectErrMsg, selectBetActionString, selectIsFetching3 } from "../../redux/bet/bet.selectors";
import { selectCurrentUser } from "../../redux/user/user.selector";
import WithSpinner from '../with-button-spinner/with-button-spinner.component';
import { SpinnerContainer, SpinnerOverlay } from "../with-button-spinner/with-buton-spinner.styled-component.jsx";
import { checkoutFrameHidden } from "../../redux/checkout/checkout.action";
import { clearUserAccumulatedBetStart } from "../../redux/betAccumulator/betAccumulator.action";





const BookingBetslipFooter = ({}) => {
    const userAccumulatedBet = useSelector(selectAllAccumulatedBet)
    const betActionString = useSelector(selectBetActionString)
    const currentUser = useSelector(selectCurrentUser)
    const { user_accumulated_bet } = userAccumulatedBet
    const [clickedBetBtn, setClickedBetBtn] = useState(false)
    const [totalOdds, setTotalOdds] = useState('0.00')
    const [totalStake, setTotalStake] = useState('0.00')
    const [potentialWin, setPotentialWin] = useState('0.00')
    const [totalBonus, setTotalBonus] = useState(0)
    const [totalBonusPercent, setTotalBonusPercent] = useState(null)
    const [value, setValue] = useState('')
    const [amounts, setAmounts] = useState([
        {amt:'100', active:false}, {amt:'200', active:false}, 
        {amt:'500', active:false}, {amt:'1000', active:false}
    ])
    const [betSystem, setBetSystem] = useState([
        {str:'single', active:false}, {str:'multiple', active:true}, 
        {str:'system', active:false}
    ])
    
    const errormsg = useSelector(selectErrMsg)
    const isFetching = useSelector(selectIsFetching3)
    useEffect(() => {
        var oddMultiplier = 1
        const OddsQualifiedForBonus = user_accumulated_bet.filter(({odd},idx) => {
            oddMultiplier = oddMultiplier * odd
            return odd > 1.50
        })
        if (oddMultiplier !== 1){
            setTotalOdds(oddMultiplier.toFixed(2))
        }
        let prize = totalStake * totalOdds
        const bonusOdds = (OddsQualifiedForBonus.length * OddsQualifiedForBonus.length) / 100
        if (OddsQualifiedForBonus.length > 3){
            let bonusAmount = (prize / 100) * bonusOdds
            prize = bonusAmount + prize
            setTotalBonus(bonusAmount)
            setTotalBonusPercent(bonusOdds)
            setPotentialWin(prize)
        } else {
            setPotentialWin(prize)
            setTotalBonus(null)
        }

    })

    const HandleChange = (e) => {
        setClickedBetBtn(false)
        var value = e.target.value
        const newArray = amounts.map(({amt}, idx) => {
            if (amt === value){
                return {amt, active:true}
            } else {
                return {amt, active:false}
            }
        })
        setAmounts(newArray)
        setValue(value)

        value = value==="" ? 0 : value
        setTotalStake(parseFloat(value))
    }
    const HandleClick = (e, index, meantfor) => {
        setClickedBetBtn(false)
        let newArray = null
        if (meantfor==='clear amount'){
            newArray = amounts.map(({amt}) => ({amt, active:false}))
            setAmounts(newArray)
            setTotalStake("0.00")
            setValue("")
        }
        if (meantfor==='amount'){
            newArray = amounts.map(({amt}, idx) => {
                if (idx === index){
                    setTotalStake(parseFloat(amt))
                    setValue(amt)
                    return {amt, active:true}
                } else {
                    return {amt, active:false}
                }
            })
            setAmounts(newArray)
        }
        if (meantfor==='system'){
            newArray = betSystem.map(({str}, idx) => idx === index 
                ? {str, active:true} : {str, active:false}
            )
            setBetSystem(newArray)
        }
    }

    const BookingCodeGenerator = () => {
        const characters= "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        const min = 5
        const max = 8
        const num = (Math.random() * (max - min + 1)) + min
        let bookingCode = ''
        const characterLength = characters.length;
        for (let i=0; i<num; i++){
            bookingCode += characters.charAt(Math.floor(Math.random() * characterLength));
        }
        return bookingCode
    }
    const dispatch = useDispatch()
    const HandleStakingAndBooking = (e) => {
        setClickedBetBtn(true)
        const bookingCode = BookingCodeGenerator()
        const data = {
            boolean: true, 
            actionStr: e.target.innerText,
            dataContent: {
                bookingCode,
                totalOdds, totalStake,
                totalBonus: totalBonus ? totalBonus.toFixed(2) : '0.00', 
                potentialWin: potentialWin.toLocaleString('en-US', {
                    style: 'currency',
                    currency: "NGN"
                }),
                totalBonusPercent: totalBonusPercent 
                                ? totalBonusPercent
                                : '0.00',
                user_accumulated_bet
            }
        }
        if (e.target.innerText ===  'Book A Bet'){
            dispatch(postBetStart(data))
        }
        else if (currentUser && e.target.innerText === 'Place A Bet'){
            if (totalStake <= currentUser.amount) dispatch(postBetStart(data))
        } 
        else if (!currentUser){
            dispatch(loginFrameHiddenStart(true))
        }
    }
    useEffect(() => {
        const elem = document.querySelector("#new-element2")
        if (betActionString && elem) {
            if (!isFetching && elem.style.display === "grid")
                elem.style.display = "none" 
                dispatch(clearUserAccumulatedBetStart())   
        }
    }, [isFetching, betActionString])
    return (
        <div className="booking-betslip__footer">
            <div className="booking-betslip__footer__wrap">
                <div className="container">
                    <div className="booking-betslip__footer__item">
                        <div onClick={e => HandleClick(e)}
                             className="booking-betslip__footer__row">
                             {
                                 betSystem.map(({str, active}, idx) => 
                                     <span key={`${idx}${str}`} onClick={e => HandleClick(e, idx, 'system')}
                                         className={`${active ? 'active-span' : null}`}>
                                         {str}
                                     </span>
                                 )
                             }
                        </div>
                        <div className="booking-betslip__footer__row">
                            <div className="booking-betslip__footer__col">
                                <div className="booking-betslip__odds">
                                    <span>Total Odds:</span><span>{totalOdds}</span>
                                </div>
                                <div className="booking-betslip__amount">
                                    <span>N</span>
                                    <FormInput 
                                    value={value}
                                    handleChange={e => HandleChange(e)} 
                                    inputtype='SmallInput'/>
                                </div>
                            </div>
                            <div className="booking-betslip__footer__col">
                                {
                                    value < 100 && value.length
                                    ? <div className="warning-text">Minimum stake is N100</div>
                                    : currentUser
                                        ? (
                                            value >= 100 && value > currentUser.amount
                                            ? <div className="warning-text">
                                                    Available balance is N{(currentUser.amount.toFixed(2))}
                                             </div> 
                                             : null
                                           )
                                    : null
                                }
                                <div className="amounts">
                                    <span style={{cursor:'pointer'}} onClick={e => HandleClick(e, null, 'clear amount')}>Clear</span>
                                    {
                                        amounts.map(({amt, active}, idx) => 
                                            <span style={{cursor:'pointer'}} key={`${idx}${amt}`} onClick={e => HandleClick(e, idx, 'amount')}
                                                className={`${active ? 'active-span' : null}`}>
                                                {amt}
                                            </span>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="booking-betslip__footer__row">
                            <div className="booking-betslip__footer__col">
                                <span>Total Stake</span>
                                <span>
                                    {
                                        totalStake !== '0.00'
                                        ? totalStake.toLocaleString('en-US', {
                                        style: 'currency',
                                            currency: "NGN"
                                        }).slice(4, totalStake.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: "NGN"
                                        }).length)
                                        : '0.00'
                                    }
                                </span>
                            </div>
                            {
                                totalBonus
                                ? <div className="booking-betslip__footer__col">
                                    <span>Total Bonus</span>
                                    <span>
                                    {
                                        totalBonus.toLocaleString('en-US', {
                                        style: 'currency',
                                            currency: "NGN"
                                        }).slice(4, totalBonus.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: "NGN"
                                        }).length)
                                    }
                                    </span>
                                </div>
                                : null
                            }
                            <div className="booking-betslip__footer__col">
                                <span>Potential Win</span>
                                <span>
                                {
                                    potentialWin !== 0 || potentialWin !== 'NaN'
                                    ? potentialWin.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: "NGN"
                                    })
                                    : '0.00'
                                }
                                </span>
                            </div>
                            <div className="booking-betslip__footer__col">
                                <CustomButton onClick={e => HandleStakingAndBooking(e)}
                                    active={value < 100 ? false : true} 
                                    buttonType="MajorButton">
                                    {
                                        isFetching
                                        ? <WithSpinner 
                                            elemStr="miniscreen" 
                                            widthAndHeight="14"  
                                            borderColor={`3px solid ${value < 100 ? 'var(--green2)' : 'var(--default)'}`}
                                            topBorderColor={`${value < 100 ? 'var(--default)' : 'var(--red)'}`}/>
                                        : null
                                    }
                                    <span>{value < 100 ? 'Book A Bet' : 'Place A Bet'}</span>
                                </CustomButton>             
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
 export default BookingBetslipFooter;






