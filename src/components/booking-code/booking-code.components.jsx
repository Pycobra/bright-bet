import React, { useEffect, useState } from "react";
import "./booking-code.styles.css";
import SiteLogo from "../site-logo/site-logo.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faSoccerBall, faTimes } from "@fortawesome/free-solid-svg-icons"
import { betFrameHidden } from "../../redux/bet/bet.action";
import { useDispatch, useSelector } from "react-redux";
import { 
    selectBooking, selectCouponID, selectBetActionString 
} from '../../redux/bet/bet.selectors.js';
import moment from "moment";




const BookingCode = () => {
    const booking = useSelector(selectBooking)
    const coupon_id = useSelector(selectCouponID)
    const bookingActionString = useSelector(selectBetActionString)
    const dispatch = useDispatch()
    const HandleBookingCodeCancel = (e) => {
        e.stopPropagation()
        dispatch(betFrameHidden({bool:false, actionStr:""}))
    }
    const gameData = bookingActionString==="Book A Bet" || bookingActionString==="Place A Bet" 
                            ? booking.user_accumulated_bet : bookingActionString==="coupon check" 
                            ? coupon_id.user_accumulated_bet : null
    const gameDetails = bookingActionString==="Book A Bet" || bookingActionString==="Place A Bet" 
                            ? booking : bookingActionString==="coupon check" ? coupon_id : null
    const [containerHeight, setContainerHeight] = useState(0)
    useEffect(() => {
        const height = gameData.length * 13
        setContainerHeight(height)
    })
    return (
            <template id="booking-code">
                <div className="booking-code-wrap">
                    <span className="cancel" onClick={e => HandleBookingCodeCancel(e)}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                    <div className="container">
                        <div className="booking-code-row">
                            <div className="container">
                                <span><SiteLogo /></span>
                                <div>
                                    <span>Betslip</span>
                                    <span>{moment().calendar()}</span>
                                </div>
                            </div>
                        </div>
                        
                        { 
                            bookingActionString==="Book A Bet" 
                            || bookingActionString==="coupon check" 
                            ?  
                             <div className="booking-code-row">
                                <div className="container">
                                    {
                                    bookingActionString==="Book A Bet" 
                                    ? <div className="booking-c-row__item">
                                        <p>Booking Code</p>
                                        <p style={{color: 'var(--green)'}}>{gameDetails.bookingCode}</p>
                                    </div>
                                    : <div className="booking-c-row__item">
                                        <p>Coupon id</p>
                                        <p style={{color: 'var(--green)'}}>{gameDetails.couponID}</p>
                                    </div>
                                    } 
                                    <div className="booking-c-row__item">
                                        <div className="row-1">
                                            <span>Odds</span>
                                            <span>{gameDetails.totalOdds}</span>
                                        </div>
                                        <div className="row-2">
                                            <span>Max Bonus</span>
                                            <span>{gameDetails.totalBonusPercent}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : null
                        }
                        {
                            bookingActionString==="Book A Bet" 
                            || bookingActionString==="coupon check" 
                            ?  
                            <div className="booking-code-row">
                                <div className="container">
                                    <div className="game-row">
                                        <div><span>Example Bet</span></div>
                                        <div><span>Stake</span><span>{gameDetails.totalStake}</span></div>
                                        <div><span>Bonus</span><span>{gameDetails.totalBonus}</span></div>
                                        <div><span>Payout</span><span>{gameDetails.potentialWin}</span></div>
                                        <div><span>Example Bet</span></div>
                                    </div>
                                    <div className="game-row">
                                        <ul style={{height:`${containerHeight>40 ? 40 : containerHeight}vh`}} className="betslip-code-list">
                                            {
                                                gameData
                                                ?   gameData.map(({AwayTeam, HomeTeam, odd, 
                                                        leagueName, leagueId, row, col, idx1, idx2, 
                                                        currentOption1, currentOption2, currentOption3, 
                                                        fourthOption, fixtureID, CardType, elementID}) => {
                                                            const strArr = Object.keys(fourthOption[idx1])
                                                            const place = fourthOption.length && CardType==="MainContentCard" && strArr
                                                                            ? strArr[idx2] 
                                                                            : fourthOption.length && CardType!=="MainContentCard" && strArr
                                                                            ? Object.keys(fourthOption[idx1][strArr[0]])[idx2]
                                                                            : null
                                                        return (
                                                        <li key={elementID}>
                                                            <div className="line-1">
                                                                <div>
                                                                    <span style={{marginRight:'10px'}}>
                                                                        <FontAwesomeIcon icon={faSoccerBall}/>
                                                                    </span> 
                                                                    <span>
                                                                        {
                                                                            place === '1' ? 'Home' : place === '2' ? 'Away'
                                                                            : place === 'X' ? 'Draw' : place === '12' ? "Home / Away"
                                                                            : place === '1X' ? 'Home | Draw' : place === 'X2' ? 'Draw / Away'
                                                                            : `(${place})`
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <span>{odd}</span>
                                                            </div>
                                                            <div className="line-2"><span>{HomeTeam} vs {AwayTeam}</span></div>
                                                            <div className="line-3">
                                                                <span>
                                                                {
                                                                    currentOption2 && currentOption3.length
                                                                    ? <span>
                                                                    { 
                                                                        currentOption2!=='Main Markets' && currentOption2.length < currentOption3[idx1].length 
                                                                        ? `${currentOption2.length <= 13 
                                                                            ? currentOption2 : currentOption2.slice(0,13) + '...'}`
                                                                        : `${currentOption3[idx1].length <= 13 
                                                                            ? currentOption3[idx1] 
                                                                            : currentOption3[idx1].slice(0,13) + '...'}`
                                                                    }
                                                                    </span>
                                                                    : <span>{strArr[0]}</span>
                                                                }
                                                                </span>
                                                            </div>
                                                        </li>)
                                                    })
                                                : null
                                            }
                                            
                                        </ul>
                                    </div>
                                </div>
                            </div>
                             : null
                        } 
                        {
                            bookingActionString==="Place A Bet"
                            ?  <div className="booking-code-row succesfull">
                                    <div className="container">
                                        <span className="check-icon">
                                            <FontAwesomeIcon style={{fontSize:'20px', fontWeight:'bold'}} icon={faCheck} />
                                        </span>
                                        <span style={{fontSize:'16px', fontWeight:'bold'}} className="successful">Bet Successful</span>
                                        <div className="main">
                                            <div><span>Total Stake</span> <span>{gameDetails.totalStake}</span></div>
                                            <div><span>Potential Win</span> <span>{gameDetails.potentialWin}</span></div>
                                            <div><span>Booking Code</span> <span>{gameDetails.bookingCode}</span></div>
                                        </div>
                                        <div className="view-bet">
                                            <span>view your bet</span> 
                                            <span>{'>'}</span>
                                        </div>
                                    </div>
                                </div>
                            : null
                        }
                    </div>
                </div>
            </template>
    )
}

 export default BookingCode;



































 







