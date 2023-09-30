import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./my-bet.styles.css";
import CustomButton from "../custom-button/custom-button.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSoccerBall, faCaretUp, faCaretDown, faWarning } from "@fortawesome/free-solid-svg-icons"
import { selectCurrentUser } from "../../redux/user/user.selector";
import { createStructuredSelector} from "reselect"; 
import { connect } from 'react-redux';
import moment from "moment";






const MyBet = ({currentUser, currentUser_bets, errMsg}) => {
    const [all_liveGames, setAll_liveGames] = useState([
        {str:'All', active:true}, 
        {str:'Settled', active:false},
        {str:'Unsettled', active:false}
    ])
    const [openBet_betHistory, setOpenBet_betHistory] = useState([
        {str:'Open Bet', active:true},
         {str:'Bet History', active:false}
        ])
    const FlipFullDisplay = (e, index) => {
        const text = e.currentTarget.querySelector('span').innerText
        if (currentUser){
            let updatedMyBet=[]
            updatedMyBet = currentUser_bets.map((obj, pos) => {
               const itm =  obj[Object.keys(obj)[0]]
                if (itm.fullDisplay === undefined){
                    itm.fullDisplay = false
                } else {
                    if (index === pos && text==="Show Details"){
                        itm.fullDisplay = true
                    } else {
                        itm.fullDisplay = false
                    }
                }
                return obj
            })
            setMyBet(updatedMyBet)
        }
    }
    const [myBet, setMyBet] = useState(
        currentUser ? currentUser_bets : []
    )

    useEffect(() => {
        if (errMsg){
            console.log(errMsg)
            if (errMsg.type==="Network Error"){
                alert(errMsg.msg)
            }
        }
    }, [errMsg])
    const HandleClick = (e, line,index) => {
        if (line==='line1'){
            const arr = openBet_betHistory.map(({str}, idx) => 
                idx===index ? {str, active:true} : {str, active:false}  
            )
            setOpenBet_betHistory(arr)
        } else if (line==='line2'){
            const arr = all_liveGames.map(({str}, idx) => 
                idx===index ? {str, active:true} : {str, active:false}  
            )
            setAll_liveGames(arr)
        }
    }

    return (
        <div className="my-bet">
            <div className="my-bet__body">
                <div className="my-bet__body-row">
                    <div className="header__btn-wrap">
                        {
                            openBet_betHistory.map(({str, active}, idx) => 
                                <CustomButton key={`${idx}${str}`} 
                                    onClick={e => HandleClick(e, 'line1', idx)}
                                    active={active ? true : false} 
                                    buttonType="MyBetButton">{str}
                                    {
                                        idx===0 && currentUser
                                        ? (currentUser_bets
                                            ? <span className={`open-bet__total${active ? ' active' : ''}`}>{
                                            currentUser_bets.length 
                                            }  </span>
                                            : null)
                                        : null
                                    }
                                </CustomButton>
                            )
                        }
                    </div>
                </div>
                <div className="my-bet__body-row">
                    <div className="body__btn-wrap">
                        {
                            openBet_betHistory.map(({str, active}, idx) => 
                                active && idx===1
                                ? all_liveGames.map(({str, active}, idx) => 
                                    <CustomButton key={`${idx}${str}`} 
                                        onClick={e => HandleClick(e, 'line2', idx)}
                                        active={active ? true : false} 
                                        buttonType="MyBetButton2">{str}
                                    </CustomButton>
                                    )
                                : null
                            )
                        }
                    </div>
                </div>
                <div className="my-bet__body-row">
                    <div className="body__btn-wrap">
                        <div className="my-bet__wrap">
                            <ul className="my-bet__wrap-items">
                                {
                                    currentUser
                                    ?  (currentUser_bets
                                        ? currentUser_bets.map((obj, pos) => {
                                            const id = Object.keys(obj)[0]
                                            const {totalStake, totalBonus, potentialWin, 
                                                totalBonusPercent, user_accumulated_bet, fullDisplay} = obj[id]
                                            return (
                                                <li key={`${id}${pos}`} className="my-bet__list-items">
                                                    <div className="head">
                                                        <span>Multiple</span>
                                                        <div onClick={e => FlipFullDisplay(e, pos)} className="hide">
                                                            <span>Show Details</span>
                                                            <FontAwesomeIcon style={{fontSize:'15px',color:'var(--green)'}} icon={faCaretDown}/>
                                                        </div>
                                                    </div>
                                                    {
                                                    fullDisplay
                                                    ? <ul>
                                                        {
                                                            user_accumulated_bet.map(({AwayTeam, fixtureTime,
                                                                HomeTeam, odd, idx1, idx2, currentOption2, 
                                                                currentOption3, fourthOption, CardType}, idx) => {
                                                            const strArr = Object.keys(fourthOption[idx1])
                                                            const place = fourthOption.length && CardType==="MainContentCard" && strArr
                                                                            ? strArr[idx2] 
                                                                            : fourthOption.length && CardType!=="MainContentCard" && strArr
                                                                            ? Object.keys(fourthOption[idx1][strArr[0]])[idx2]
                                                                            : null
                                                            var gameTime = new Date(fixtureTime)
                                                            var currentTime = new Date()
                                                            return <li className="my-bet__inner-list-items" key={`${odd}${idx}`}>
                                                                <div className="li-wrap">
                                                                    <span style={{fontWeight:'bold',fontSize:'9px',color:'var(--brown17)'}}>
                                                                        {
                                                                            gameTime > currentTime 
                                                                            ? 'Not Start'
                                                                            : gameTime < currentTime
                                                                            ? 'Ended'
                                                                            : null
                                                                        }
                                                                    </span>
                                                                    <div className="li-wrap__main">
                                                                        <div className="line-1">
                                                                            <FontAwesomeIcon icon={faSoccerBall} />
                                                                            <span className="text">
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
                                                                            <span className="odd">@{odd}</span>
                                                                            <span>
                                                                                {
                                                                                    place === '1' ? 'Home' : place === '2' ? 'Away'
                                                                                    : place === 'X' ? 'Draw' : place === '12' ? "Home / Away"
                                                                                    : place === '1X' ? 'Home | Draw' : place === 'X2' ? 'Draw / Away'
                                                                                    : `(${place})`
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                        <span className="line-2">{HomeTeam} vs {AwayTeam}</span>
                                                                        <span className="line-3">9/09/2002/</span>
                                                                    </div>
                                                                </div>
                                                                    </li>
                                                            })
                                                        }
                                                        
                                                        <li className="my-bet__wrap-btm">
                                                            <div  onClick={e => FlipFullDisplay(e, pos)} className="hide">
                                                                <span>Hide Details</span>
                                                                <FontAwesomeIcon style={{fontSize:'15px',color:'var(--green)'}} icon={faCaretUp}/>
                                                            </div>
                                                            <div className="line-2">
                                                                <div><span>Stake</span><span>Pot. wining</span></div>
                                                                <div style={{fontSize:'11px',fontWeight:'bold'}}>
                                                                    <span>{totalStake}</span><span>{potentialWin}</span>
                                                                </div>
                                                                <CustomButton 
                                                                    style={{fontWeight:'bold',color:'var(--white)',backgroundColor:'green'}} 
                                                                    buttonType="MajorButton">Cashout</CustomButton>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    : (
                                                        <ul>
                                                        {
                                                            user_accumulated_bet.map(({AwayTeam, fixtureTime,
                                                                HomeTeam, odd, idx1, idx2, currentOption2, 
                                                                currentOption3, fourthOption, CardType}, idx) => {
                                                            const strArr = Object.keys(fourthOption[idx1])
                                                            const place = fourthOption.length && CardType==="MainContentCard" && strArr
                                                                            ? strArr[idx2] 
                                                                            : fourthOption.length && CardType!=="MainContentCard" && strArr
                                                                            ? Object.keys(fourthOption[idx1][strArr[0]])[idx2]
                                                                            : null
                                                            var gameTime = new Date(fixtureTime.split(",").slice(1,).join(", "))
                                                            var currentTime = new Date()

                                                            return idx===0
                                                            ? <li className="my-bet__inner-list-items" key={`${odd}${idx}`}>
                                                                <div className="li-wrap">
                                                                    <span className="fixture-update" style={{color:'var(--brown17)'}}>
                                                                        {
                                                                            gameTime > currentTime 
                                                                            ? 'Not Start'
                                                                            : gameTime < currentTime
                                                                            ? 'Ended'
                                                                            : null
                                                                        }
                                                                    </span>
                                                                    <div className="li-wrap__main">
                                                                        <div className="line-1">
                                                                            <FontAwesomeIcon icon={faSoccerBall} />
                                                                            <span className="text">
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
                                                                            <span className="odd">@{odd}</span>
                                                                            <span>
                                                                                {
                                                                                    place === '1' ? 'Home' : place === '2' ? 'Away'
                                                                                    : place === 'X' ? 'Draw' : place === '12' ? "Home / Away"
                                                                                    : place === '1X' ? 'Home | Draw' : place === 'X2' ? 'Draw / Away'
                                                                                    : `(${place})`
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                        <span className="line-2">{HomeTeam} vs {AwayTeam}</span>
                                                                        <span className="line-3">{fixtureTime}</span>
                                                                    </div>
                                                                </div>
                                                                </li>
                                                                : null
                                                            })
                                                        }
                                                    </ul>
                                                    )
                                                    }
                                                </li>
                                        )})
                                        : <div className="empty-text">
                                            <FontAwesomeIcon icon={faWarning}
                                                style={{marginRight:'7px'}} />
                                            {
                                                openBet_betHistory.map(({str, active}, idx) =>
                                                idx===0  && active
                                                ? <span key={`${idx}${str}`}>Your have no open bet</span>
                                                : idx===1  && active
                                                ?  <span key={`${idx}${str}`}>Your bet history is empty</span>
                                                : null
                                                )

                                            }
                                        </div>)
                                    : <div className="empty-text">
                                        <FontAwesomeIcon icon={faWarning}
                                                style={{marginRight:'7px'}} />
                                        <span>login to see bet details</span>
                                    </div>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
})
export default connect(mapStateToProps)(MyBet);


































