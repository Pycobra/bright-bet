import React, { useEffect, useCallback, useMemo, useState }  from "react";
import "./league-card.styles.css";
import LeagueCardMainItem from "../league-card-main-item/league-card-main-item.components";
import { connect, useDispatch, useSelector } from 'react-redux';
import { selectLeagueNames } from '../../redux/bet/bet.selectors';
import { selectOption4 } from '../../redux/optionHeads/optionHeads.selectors';
import { createStructuredSelector} from "reselect"; 
import { selectAccordion, selectHeaders } from "../../redux/bet/bet.selectors";
import { 
    fetchOption1Start, fetchOption2Start, 
    fetchOption3Start, fetchOption4Start 
} from "../../redux/optionHeads/optionHeads.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons"
import  {Option3Container } from './league-card.styled-components'
import { CardTypeContext } from "../context/card-type.context";
import moment from 'moment'
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { removeLeagueStart } from "../../redux/bet/bet.action";
import { selectTopVNavTrigerred } from "../../redux/bet/bet.selectors";





const LeagueCard = ({data, objID, CardType}) => {
    const fixtureByTime = Object.keys(data)[0]
    const {items, id, name} = data[fixtureByTime]

    const dispatch = useDispatch()
    const unchangedItem = useMemo(() => items.map(itm => [itm]))
    const [objectItem, setObjectItem] = useState(items.map(itm => [itm]))

    const topNavTriggered = useSelector(selectTopVNavTrigerred)

    const options1 = useSelector(selectHeaders('level1'))
    const options2 = useSelector(selectHeaders('level2'))
    const options3 = useSelector(selectHeaders('level3'))
    const options4 = useSelector(selectOption4)
    const [options1_state, setOptions1_state] = useState(options1)
    const [options2_state, setOptions2_state] = useState(
        options2.map(obj => ({items:obj, display:false}))
    )
    const [options3_state, setOptions3_state] = useState(
        options3.map(obj => obj.map(itm =>  ({items:itm, display:false})))
    )

    const leagueNames = useSelector(selectLeagueNames)
    const [currentClick, setCurrentClick] = useState({currentClickOpt:'options1', currentClickPos:0})
    const {currentClickOpt, currentClickPos} = currentClick
    const [gameTiming, setGameTiming] = useState([
        {name:'Today', active:false}, {name:'Week', active:false}, {name:'All', active:true}
    ])

    const HandleSpanClick = (e, position, place) => {
        setCurrentClick({currentBtn:e, currentClickOpt:place, currentClickPos: position})
    }
    const headerCallback = useCallback(() => {
        var updateOption3
        if (currentClickOpt === 'options1') {
            const updateOption1 = options1_state.map((obj, index) => 
                index === currentClickPos 
                ? {...obj, 'active': true} 
                : {...obj, 'active': false}
            );  
            const updateOption2 = options2_state.map((obj, index) => {
                return index === currentClickPos 
                ? {...obj, display: true} 
                : {...obj, display: false}
            });
            updateOption2.map((hash, index) => {
                if (hash.display){
                    hash.items.map(dict => {
                        if (dict.active){
                            updateOption3 = options3_state.map((obj, pos) => {
                                return pos === index
                                    ? obj.map((itm,idx) => {
                                        if (idx === dict.id ){
                                            //since the num of stri/obj that ll occupy dom place for option 3 always changes,
                                            // i use state mgt(setOption4_state) to update num of stri on each re-render,
                                            //so as to adjust the css accordingly  
                                            var objList = itm.items.map((p) => {
                                                return p.items
                                            })
                                            dispatch(fetchOption4Start(objList))
                                            return {...itm, display: true} 
                                        } else {
                                            return {...itm, display: false}
                                        }
                                    })
                                    : obj.map(itm => ({...itm, display: false}))
                            })
                        }
                    })
                }
            })
            setOptions1_state(updateOption1)
            setOptions2_state(updateOption2)
            setOptions3_state(updateOption3)
            dispatch(fetchOption1Start(updateOption1))
            dispatch(fetchOption2Start(updateOption2))
            dispatch(fetchOption3Start(updateOption3))
        }
        if (currentClickOpt === 'options2') {
            const updateOption2 = options2_state.map((obj, index) => {
                if (obj.display){
                    updateOption3 = options3_state.map((itm, pos) => 
                        pos === index 
                            ? itm.map((itm,index) => {
                                if (index === currentClickPos){
                                    //since the num of stri/obj that ll occupy dom place for option 3 & option 4 
                                    //always changing, based on lenght of option 4 i use state mgt(setOption4_state)
                                    // to update num of stri on each re-render, so as to adjust the css accordingly 
                                    var objList = itm.items.map((p) => {
                                        return p.items
                                    })
                                    dispatch(fetchOption4Start(objList))
                                    return {...itm, display: true} 
                                } else {
                                    return {...itm, display: false}
                                }
                            })
                            : itm 
                    )
                    return {...obj, items: obj.items.map((itm,index) => 
                        index === currentClickPos 
                        ? {...itm, active: true} 
                        : {...itm, active: false}
                    )}
                }
                else {
                    return obj
                }
            });
            setOptions2_state(updateOption2)
            setOptions3_state(updateOption3)
            dispatch(fetchOption2Start(updateOption2))
            dispatch(fetchOption3Start(updateOption3))
        }
    }, [currentClick])
    const timingCallback = useCallback(() => { 
        const todaysDate = moment().format('llll').split(',').slice(0,2).join('')
        const weekDateArray = [
            todaysDate,
            moment().add(1, 'd').format('llll').split(',').slice(0,2).join(''),
            moment().add(2, 'd').format('llll').split(',').slice(0,2).join(''),
            moment().add(3, 'd').format('llll').split(',').slice(0,2).join(''),
            moment().add(4, 'd').format('llll').split(',').slice(0,2).join(''),
            moment().add(5, 'd').format('llll').split(',').slice(0,2).join(''),
            moment().add(6, 'd').format('llll').split(',').slice(0,2).join('')
        ]

        if (currentClickOpt === 'game-timing') {
            const updateTiming = gameTiming.map((obj, index) => 
                index === currentClickPos  
                ? {...obj, 'active': true} 
                : {...obj, 'active': false});
            setGameTiming(updateTiming)
            updateTiming.map(({name, active}, idx) => {
                if (active){
                    var updateObjectItem
                        updateObjectItem = unchangedItem.map(obj => {
                            return obj[0]
                            ? Object.keys(obj[0]).map((itm, idx) => {
                                if (name === 'Today') {
                                    return todaysDate === itm
                                    ? obj[0] : null
                                } else if (name === 'Week') {
                                    return weekDateArray.includes(itm)
                                    ? obj[0] : null
                                } else if (name === 'All'){
                                    return obj[0]
                                }
                            })
                            : obj
                        })
                    setObjectItem(updateObjectItem)
                }
            })
        }
    }, [currentClick])
    
    useEffect(() => {
        headerCallback()
        timingCallback()
    },[headerCallback, timingCallback])

    const removeLeague = (e, league_id) => {
        dispatch(removeLeagueStart(league_id))    
    }
    const [caretClicked, setCaretClicked] = useState(false)
    const HandleCaretClick = () => {
        setCaretClicked(!caretClicked)
    }
    return (    
        <div id="league-card">
            <div className="league-card__wrap">
                <div className="league-card__item">
                    <div id="league-card__main-content">
                        <div className="container">
                            <div className="l-c-item__wrap">
                                <div className="l-c-item">
                                    <div className="l-c-item__head">
                                        <span>{name}</span>
                                        <span className="booking-betslip__img-holder">
                                            <FontAwesomeIcon 
                                                style={{
                                                    height:'15px', padding:'3px 0 3px 10px',
                                                }} 
                                                onClick={e => removeLeague(e, id)} 
                                                icon={faTimes} />
                                        </span>
                                    </div>
                                </div>
                                <div className="l-c-item">
                                    <div className="l-c-item__head">
                                        <div className="col">
                                        {
                                            gameTiming.map(({name, active}, idx) => 
                                            <span onClick={e => HandleSpanClick(e, idx, 'game-timing')} key={idx} className={active ? 'active-span' : null}>{name}</span>)
                                        }
                                        </div>
                                        <div className="col"><span>Order By:</span><span>League</span></div>
                                    </div>
                                </div>
                                <div className="l-c-item">
                                    <div className="content">
                                        {
                                            options1_state.map(({name, active, id}, idx) => 
                                                <span onClick={e => 
                                                    HandleSpanClick(e, idx, 'options1')} 
                                                    key={id} className={active ? 'active-span' : null}>
                                                        {name}
                                                </span>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="l-c-item">
                                    <div id='option2' className="content">
                                        {
                                            options2_state.map(obj => 
                                                obj.display ?
                                                obj.items.map(({name, id, active}, idx) =>
                                                    <span onClick={e => 
                                                        HandleSpanClick(e, idx, 'options2')} key={idx} 
                                                        className={active ? 'active-span' : null}>{name}
                                                    </span>
                                                )
                                                : null
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="l-c-item">
                                    <div className="l-c-item__head-1">
                                        <span>{name}</span>
                                        {
                                            objectItem.length
                                            ? <span onClick={e => HandleCaretClick()}
                                                style={{fontSize:'15px',padding:'3px 10px'}}>
                                                <FontAwesomeIcon icon={caretClicked ? faCaretDown : faCaretRight} className="icon"/>
                                            </span>
                                            : null
                                        }
                                    </div>
                                </div>
                                <div className="l-c-item">
                                    <div className="l-c-item__table">
                                        <div className="container">
                                            <div className='l-c-item__table-betting'>
                                                
                                            {
                                                objectItem.length && caretClicked
                                                ? <div className='l-c-item__table-betting-wrap'>
                                                    <div className='l-c-item__table-item'>
                                                        <div className='l-c-item__table-head'>
                                                            <div className="content">
                                                                <span>
                                                                    {
                                                                        gameTiming.map(({name, active}, idx) => 
                                                                            active
                                                                            ? <span key={idx}>{name}</span>
                                                                            : null
                                                                        )
                                                                    }
                                                                </span>
                                                                <Option3Container data={options4} >
                                                                    {
                                                                        options3_state
                                                                        ? options3_state.map(i => 
                                                                            i.map(({items, display}) => 
                                                                            display
                                                                            ? items.map(({name}, idx) =>
                                                                                    <span key={`${idx}${items.name}`} 
                                                                                        className='content-odd__title-col'>{name}</span> 
                                                                                    )
                                                                            : null
                                                                            )
                                                                        )
                                                                        : null
                                                                    }
                                                                </Option3Container>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='l-c-item__table-item'>
                                                        <CardTypeContext.Provider value={CardType}>
                                                        {
                                                            objectItem.map((singleItem, idx) =>
                                                                singleItem[0]
                                                                ? <LeagueCardMainItem key={idx} 
                                                                leagueId={id} singleItem={singleItem} leagueName={name}/>
                                                                : null
                                                            )
                                                        }
                                                        </CardTypeContext.Provider>
                                                    </div>
                                                </div>
                                                : !objectItem.length && !caretClicked
                                                ? <div className='l-c-item__table-betting-wrap'>
                                                        <div className='l-c-item__table-item empty'>
                                                            No Fixture Found
                                                        </div>
                                                    </div>
                                                : null
                                            }
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
    accordion_hash: selectAccordion,
})
export default connect(mapStateToProps)(LeagueCard);


