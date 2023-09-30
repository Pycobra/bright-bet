import React, { useState, useEffect, useContext } from "react";
import "./booking-betslip.styles.css";
import CheckBoxInput from "../checkbox-input/checkbox-input.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { useSelector, useDispatch } from "react-redux";
import { selectAllAccumulatedBet } from "../../redux/betAccumulator/betAccumulator.selectors";
import { removeUserAccumulatedBetStart } from "../../redux/betAccumulator/betAccumulator.action";



const BookingBetslip = ({}) => {
    const userAccumulatedBet = useSelector(selectAllAccumulatedBet)
    const { user_accumulated_bet } = userAccumulatedBet
    const dispatch = useDispatch()
    const removeGame = (e, elementID) => {
        dispatch(removeUserAccumulatedBetStart(elementID))   
    }
    return (
        <div className="booking-betslip">
            <div className="booking-betslip__wrap">
                <div className="container">
                {
                    user_accumulated_bet.length
                    ? user_accumulated_bet.map(({AwayTeam, HomeTeam, odd, 
                        leagueName, leagueId, row, col, idx1, idx2, 
                        currentOption1, currentOption2, currentOption3, 
                        fourthOption, fixtureID, CardType, elementID}, idx) => {

                        const strArr = Object.keys(fourthOption[idx1])
                        const place = fourthOption.length && CardType==="MainContentCard" && strArr
                                        ? strArr[idx2] 
                                        : fourthOption.length && CardType!=="MainContentCard" && strArr
                                        ? Object.keys(fourthOption[idx1][strArr[0]])[idx2]
                                        : null
                    return <div id={elementID} key={idx} className="booking-betslip__item">
                        <div className="booking-betslip__head">
                            <div className="booking-betslip__text-place">
                                <CheckBoxInput inputType='CHECKBOX2'/>
                                <span>{HomeTeam} - {AwayTeam}</span>
                            </div>
                            <div className="booking-betslip__img-holder" style={{cursor:'pointer'}}>
                                <FontAwesomeIcon onClick={e => removeGame(e, elementID)} icon={faTimes} />
                            </div>
                        </div>
                        <div className="booking-betslip__body">
                            <div className="booking-betslip__body-col">
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
                                <span>
                                 {
                                    place === '1' ? 'Home' : place === '2' ? 'Away'
                                    : place === 'X' ? 'Draw' : place === '12' ? "Home / Away"
                                    : place === '1X' ? 'Home | Draw' : place === 'X2' ? 'Draw / Away'
                                    : `(${place})`
                                 }
                                </span>
                                <span>{leagueName}</span>
                            </div>
                            <div className="booking-betslip__body-col">
                                <span>{odd}</span>
                            </div>
                        </div>
                    </div>
                    })
                    : null
                }
                </div>
            </div>

        </div>
    )
}

 export default BookingBetslip;



































 