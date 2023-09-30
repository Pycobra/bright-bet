import React, { useState, useContext, useEffect } from "react";
import "./main-content-card.styles.css";
import Accordion from "../accordion/accordion.components";
import { createStructuredSelector} from "reselect"; 
import { connect, useDispatch, useSelector } from 'react-redux';
import { fetchUpcomingGamesStart } from "../../redux/bet/bet.action";
import { 
    // selectAccordion, selectLeague, selectUpcomingGamesMap, 
    selectUpcomingGames, 
} from "../../redux/bet/bet.selectors";
// import  { LiveBettingDummyPlaceHolder, LiveBettingDummyOdds}  from "../context/liveBetting.context";
// import { Option3Container } from './main-content-card.styled-components'
import { CardTypeContext } from "../context/card-type.context";
import LeagueCardMainItem from "../league-card-main-item/league-card-main-item.components";
// import { fetchOption4Start } from "../../redux/optionHeads/optionHeads.action";






// const MainContentCard = ({upcomingGames, LiveBetting, Upcoming, AccordionHash, CardType}) => {
const MainContentCard = ({ AccordionHash, CardType}) => {
        const HandleMainContentClick = e => {}
    
    // const liveBettingDummyOdds = useContext(LiveBettingDummyOdds)
    // const liveBettingDummyPlaceHolder = useContext(LiveBettingDummyPlaceHolder)
    // const cardItems = CardType==='Upcoming' ? UpcomingGamesMapToDisplay : CardType==='LiveBetting' ? liveBettingDummyPlaceHolder : []
    // const UpcomingGamesMapToDisplay = useSelector(selectUpcomingGames)
    const cardItems = useSelector(selectUpcomingGames)
    const [hasUpcomingGamesToDisplay, setHasUpcomingGamesToDisplay] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUpcomingGamesStart(CardType))
    },[CardType])
    useEffect(() => {
        const hasContent = cardItems.map(data => Object.values(data)[0].items.length).find(i => i)
        if (hasContent) setHasUpcomingGamesToDisplay(true)
    },[cardItems])
    
    return (
        <div id="main-content-card">
            <div className="container">
                <div className="m-c-c-item__wrap">
                    <div className="m-c-c-item">
                        <div className="m-c-c-item__head-1">
                            <span>{CardType==='LiveBetting' ? 'Live Highlights' : CardType==='Upcoming' ? 'Upcoming' : null}</span>
                            <span>{CardType==='LiveBetting' ? 'View Live Highlights' : CardType==='Upcoming' ? 'View Upcoming' : null}</span>
                        </div>
                    </div>
                    <div className="m-c-c-item">
                        <div className="m-c-c-item__head-2">
                            <Accordion HandleMainContentClick={HandleMainContentClick} AccordionHash={AccordionHash} MainContentCard/> 
                        </div>
                    </div>
                    <div className="m-c-c-item">
                        <div className="m-c-c-item__table">
                            <div className="container">
                                <div className={`m-c-c-item__table-betting 
                                    ${CardType==='LiveBetting' ? 'live-betting' : 'sport-betting'}`}>
                                    <div className={`m-c-c-item__table-betting-wrap 
                                        ${CardType==='LiveBetting' ? 'l-betting__wrap' : 's-betting__wrap'}`}>
                                        
                                        {/* <div className={`m-c-c-item__table-item 
                                            ${CardType==='LiveBetting' ? 'l-betting__item' : 's-betting__item'}`}>
                                            <div className={`m-c-c-item__table-head 
                                                ${CardType==='LiveBetting' ? 'l-betting__item__head-1' : 's-betting__item__head-1'}`}>
                                                <div className="content">
                                                    <span>{CardType==='Upcoming' ? 'Today' : null}</span>
                                                    <Option3Container data={liveBettingDummyOdds}>
                                                        <span className="content-odd__title-col">1/2</span> 
                                                        <span className="content-odd__title-col">Double Chance</span>
                                                    </Option3Container>
                                                </div>
                                            </div>
                                        </div> */}
                                        <div className={`m-c-c-item__table-item 
                                            ${CardType==='LiveBetting' ? 'l-betting__item' : 's-betting__item'}`}>
                                            <div className={`m-c-c-item__table-item__wrap 
                                                ${CardType==='LiveBetting' ? 'l-betting__item-wrap' : 's-betting__item-wrap'}`}>
                                                <CardTypeContext.Provider value={CardType}>
                                                    {
                                                        hasUpcomingGamesToDisplay
                                                        ? cardItems.map((data, idx) => { 
                                                            const league = Object.keys(data)[0]
                                                            const {items, id, name} = data[league]
                                                            const objectItem = items.map(itm => [itm])
                                                            return objectItem
                                                            ? objectItem.map((singleItem, idx) =>
                                                                singleItem[0]
                                                                ? <LeagueCardMainItem key={idx} 
                                                                    leagueId={id} leagueName={name} singleItem={singleItem} Upcoming/>
                                                                : null
                                                                )
                                                            : null
                                                        })
                                                        : <span style={
                                                            {display:"grid",width: "100%",fontSize: "14px",justifyContent: "center",padding: "40px 20px"}
                                                            }>
                                                            no upcoming game today
                                                        </span>
                                                    }
                                                </CardTypeContext.Provider>
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = createStructuredSelector({
    upcomingGames: selectUpcomingGames,
})
export default connect(mapStateToProps)(MainContentCard);






