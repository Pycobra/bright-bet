import React, { useContext, useMemo, useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from 'react-redux';
import "./betslip-table-item.styles.css";
import { createStructuredSelector} from "reselect"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAlignRight } from "@fortawesome/free-solid-svg-icons"
import { selectSingleClub } from "../../redux/bet/bet.selectors";
import { StyledOption4Container } from './betslip-table-item.styled-components'
import { LiveBettingDummyOdds }  from "../../context/liveBetting.context";
import { CardTypeContext } from "../../context/card-type.context";
import { fetchUserAccumulatedBetStart } from "../../redux/betAccumulator/betAccumulator.action";
import { selectOption1, selectOption2, selectOption3, selectOption4 } from "../../redux/optionHeads/optionHeads.selectors";
import { selectAllAccumulatedBet } from "../../redux/betAccumulator/betAccumulator.selectors";





const BetslipTableItem = ({objDetails, leagueId, leagueName}) => {
    var time, AwayTeam, HomeTeam, scoresForHome, scoresForAway
    var homeTeamID, awayTeamID, dateAndTime


    const CardType = useContext(CardTypeContext)
    const leagueFixture = useSelector(selectSingleClub(leagueId))
    if (CardType === 'LiveBetting'){
        var {time, AwayTeam, HomeTeam, scoresForHome, scoresForAway} = objDetails
    } else {
        var {homeTeamID, awayTeamID, dateAndTime} = objDetails
        var HomeTeam = leagueFixture[homeTeamID]
        var AwayTeam = leagueFixture[awayTeamID]
        var time = dateAndTime.split(' ')[4]
        const time1 = time.split(':')[0]
        const time2 = time.split(':')[1]
        if (time1.length === 1){
            time = '0'+time1 + ':' + time2
        }
    }
    
    const option1_state = useSelector(selectOption1)
    const option2_state = useSelector(selectOption2)
    const option3_state = useSelector(selectOption3)
    const [currentOption1, setCurrentOption1] = useState(null)
    const [currentOption2, setCurrentOption2] = useState(null)
    const [currentOption3, setCurrentOption3] = useState(null)
    const [idExist, setIdExist] = useState([])

    
    const dispatch = useDispatch()
    const HandleOddClick = (e, row, col, idx1, idx2, elementID) => {
        const odd = e.target.outerText
        dispatch(fetchUserAccumulatedBetStart({AwayTeam: AwayTeam.name, 
                        HomeTeam: HomeTeam.name, odd, 'fixtureTime':dateAndTime, leagueName, leagueId, 
                        row, col, idx1, idx2, currentOption1, currentOption2, 
                        currentOption3, fourthOption: option4stateContext, 
                        fixtureID: objDetails.fixtureID, CardType,
                        elementID}))   
    }
        
    const liveBettingDummyOdds = useContext(LiveBettingDummyOdds)
    const useOption4 = useSelector(selectOption4)
    const option4stateContext = CardType==='MainContentCard' ? useOption4 : liveBettingDummyOdds
    const GetRandomOdds = useMemo(() => {
        const min = 1.00
        const max = 15.00

        let arrayOfRandomOdds = []
        option4stateContext.map((itm,pos) => {
            if (CardType==="MainContentCard"){
                arrayOfRandomOdds.push(Object.keys(itm).map((n, ind) => {
                        var unRounded = (Math.random() * (max - min + 1)) + min;
                        return {[n]:unRounded.toFixed(2), id:`${pos + ind}${pos}${pos + ind}${n}`}
                }))
            } 
            else {
                Object.keys(itm).map((n, ind) => {
                    arrayOfRandomOdds.push(Object.keys(itm[n]).map((i, ind) => {
                            var unRounded = (Math.random() * (max - min + 1)) + min;
                            return {[i]:unRounded.toFixed(2), id:`${pos + ind}${pos}${pos + ind}${i}`}
                    }))
                })
            }
        })
        return arrayOfRandomOdds
    }, [option4stateContext])

    const [score, setScore] = useState({score1: 0,score2: 0})
    const {score1, score2} = score

    useEffect(() => {
      const min = 1
      const max = 6
      setInterval(() => {
        var score1 = (Math.random() * (max - min + 1)) + min;
        var score2 = (Math.random() * (max - min + 1)) + min;
        setScore({score1:parseInt(score1), score2:parseInt(score2)})

      }, 20000);
    },[])
    
    const userAccumulatedBet = useSelector(selectAllAccumulatedBet)
    const { user_accumulated_bet } = userAccumulatedBet
    useEffect(() => {
        var activeOption1 = null
        var activeOption2 = null
        var activeOption3 = null
        option1_state.map(({name, active}) => 
            active ? activeOption1 = name : null
        )
        option2_state.map(obj => 
            obj.display ?
            obj.items.map(({name, active}) =>
                active ? activeOption2 = name : null
            )
            : null
        )
        option3_state.map(i => 
            i.map(({items, display}) => 
                display ? activeOption3 = items.map(i => i.name) : null  
            )
        )
        setCurrentOption1(activeOption1)
        setCurrentOption2(activeOption2)
        setCurrentOption3(activeOption3)

        //this block checks for all the clicked odds
        const idExistInAccumulation = user_accumulated_bet.filter(obj => 
            obj.fixtureID===objDetails.fixtureID
        )
        setIdExist(idExistInAccumulation)
    }, [option1_state, option2_state, option3_state, 
        useOption4, user_accumulated_bet.length])

    return (
    <div className="table-item" id={objDetails.fixtureId}>
        <div className="table-item-col">
            <div className="table-item__time-text">{time}</div>
            <div className="table-item__team">
                <div className="table-item__team-wrap">
                    <span className="team-text home">{HomeTeam ? HomeTeam.name : null}</span>
                    <span>VS</span>
                    <span className="team-text away">{AwayTeam ? AwayTeam.name : null}</span>
                </div>
            </div>
        </div>
        <div className="table-item-col">
            <div className="table-item__img-holder">
                <span className="icon"><FontAwesomeIcon icon={faAlignRight} /></span>
            </div> 
            <div className="table-item__score">
                {CardType === 'LiveBetting'
                ?
                    <div className="table-item__score-wrap">
                        <span className="score-text home">{score1}</span>
                        <span className="score-text away">{score2}</span>
                    </div>
                : null}
            </div>
            <div className="table-item__odd">
                <StyledOption4Container data={option4stateContext} cardtype={CardType} page='betslip-table-item'>
                {
                    GetRandomOdds.length
                    ? GetRandomOdds.map((obj, idx1) => {
                        var row= idx1===0 ? 'row-1' : idx1===1 ? 'row-2' : null
                        return <div key={idx1} 
                        className="table-item__odd-item">
                            {
                                obj.map((i, idx2) => {
                                    var col= idx2===0 ? 'col-1' : idx2===1 ? 'col-2' : idx2===2 ? 'col-3' : null
                                    return <span onClick={e => HandleOddClick(e, row, col, idx1, idx2, `${i[Object.keys(i)[1]]}${objDetails.fixtureID}`)}    
                                                style={{
                                                    // this ensure that clicked odds are alway green on every component re-renders 
                                                    backgroundColor: `${
                                                        idExist.length 
                                                        ?   (
                                                                idExist.find(obj => 
                                                                    obj.idx1===idx1 && obj.idx2===idx2 
                                                                    && obj.elementID === 
                                                                    `${i[Object.keys(i)[1]]}${objDetails.fixtureID}`)
                                                                ? 'var(--canal-green)' 
                                                                : 'black'
                                                            )
                                                        : 'black'
                                                    }`
                                                }}
                                                id={`${i[Object.keys(i)[1]]}${objDetails.fixtureID}`}
                                                key={idx2} 
                                                className="odd-text">
                                                    {
                                                    // since odds are dynamically generated and will have changed each time
                                                    // this component re-renders, this block ensures the particular odd 
                                                    // that was clicked still remain the same 
                                                    idExist.length
                                                    ?   (
                                                            idExist.find(obj => 
                                                                obj.idx1===idx1 && obj.idx2===idx2 
                                                                && obj.elementID === 
                                                                `${i[Object.keys(i)[1]]}${objDetails.fixtureID}`)
                                                            ?  idExist.find(obj => 
                                                                obj.idx1===idx1 && obj.idx2===idx2 
                                                                && obj.elementID === 
                                                                `${i[Object.keys(i)[1]]}${objDetails.fixtureID}`).odd
                                                            :   i[Object.keys(i)[0]]
                                                        )
                                                    : i[Object.keys(i)[0]]
                                                    }
                                            </span>
                                })
                            } 
                        </div>
                    })
                    : null
                }
                </StyledOption4Container>
            </div>
        </div>
    </div>                                          
    )
}

export default BetslipTableItem;










