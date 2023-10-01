import React, { useContext } from "react";
import { useSelector } from "react-redux";
import "./league-card-main-item.styles.css";
import BetslipTableItem from "../betslip-table-item/betslip-table-item.components";
import { StyledOption4Container, StyledOption4Content } from './league-card-main-item.styled-components';
import { selectOption4 } from "../../redux/optionHeads/optionHeads.selectors";
import { CardTypeContext } from "../../context/card-type.context";
import  { LiveBettingDummyOdds }  from "../../context/liveBetting.context";






const LeagueCardMainItem = ({singleItem, leagueName, leagueId}) => {
    const item = singleItem[0]
    const fixtureTime = Object.keys(item)[0]
    const liveBettingDummyOdds = useContext(LiveBettingDummyOdds)
    const useOption4 = useSelector(selectOption4)

    const CardType = useContext(CardTypeContext)
    const option4stateContext = CardType==='MainContentCard' ? useOption4 : liveBettingDummyOdds
    return (                                            
        <div className='league-card__main-item'>
            <div className='l-c__m-i__item'>
                <div className='l-c__m-i__item-head'>
                    <div className="content">
                        {
                            CardType === 'MainContentCard'
                            ? <span className="content-date">{fixtureTime}</span>
                            : <span className="content-date">{leagueName}</span>
                        }
                        <StyledOption4Container data={option4stateContext} cardtype={CardType}>
                            {
                                option4stateContext.length 
                                ? option4stateContext.map((obj, idx) => 
                                    <div key={idx} className="content-odd__head-col">
                                        {
                                            CardType === "MainContentCard"
                                            ? Object.keys(obj).map((i, idx) => 
                                                <span key={idx} className="odd__head-text">
                                                    {i}
                                                </span>
                                            )
                                            : Object.keys(obj).map((i, idx) => 
                                                Object.keys(obj[i]).map((str,idx) => 
                                                    <span key={idx} className="odd__head-text">
                                                        {str}
                                                    </span>
                                                )
                                            )
                                        }
                                    </div>
                                )
                                : null
                            }
                        </StyledOption4Container>
                    </div>
                </div>
            </div>
            <div className='l-c__m-i__item'>
                <div className='l-c__m-i__item__wrap'>
                    {   item[fixtureTime].length && option4stateContext.length
                        ? item[fixtureTime].map((itm,idx) => 
                            itm !== undefined
                            ? <BetslipTableItem  key={`${idx}${itm}`} leagueName={leagueName}
                                objDetails={itm} index={idx} leagueId={leagueId}/>
                            : null
                        )
                        : null
                    }
                </div>
            </div>
        </div>
    )
}

 export default LeagueCardMainItem;








 