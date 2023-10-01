import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./side-nav-left.styles.css";
import FormGroup from "../form-group/form-group.components";
import Accordion from "../accordion/accordion.components";
import { selectAccordion } from "../../redux/bet/bet.selectors";
import { createStructuredSelector} from "reselect"; 
import { connect, useSelector, useDispatch } from 'react-redux';
import { fetchTimeRangeStart } from "../../redux/bet/bet.action";
import { selectLeagueNames, selectTimeRange } from '../../redux/bet/bet.selectors';
import { fetchLeagueStart, topNavTriggered } from "../../redux/bet/bet.action";


const SideNavLeft = () => {
    const accordion_hash = useSelector(selectAccordion('SIDENAV'))
    const leagueNames = useSelector(selectLeagueNames)
    
    const [clicked, setClicked] = useState(
        Array.from(leagueNames).map((obj,idx) => obj.active ? true : false)
    )
    const [leagueMain, setLeagueActivate] = useState(leagueNames)
    const dispatch = useDispatch()
    const time_range = useSelector(selectTimeRange)
    const [timeRangeObject, setTimeRangeObject] = useState(time_range)
    const HandleTimeRangeClick = (e, index) => {
        const new_time_range = time_range.map((obj, idx) => index === idx ? {...obj, active:true} : {...obj, active:false})
        setTimeRangeObject(new_time_range)
    }
    const navigate = useNavigate()
    const HandleClick = (e, title, id, position) => {
        const clickedState = clicked.map((obj, index) => index === position ? !obj : obj); 
        setClicked(clickedState)
        const updateLeague = leagueMain.map((obj, index) => 
            index === position ? {...obj, 'active': !obj.active} : obj); 
        dispatch(fetchLeagueStart(id))
        navigate(`/popularCoupons/${title}/${id}`)
        dispatch(topNavTriggered(true))
        setLeagueActivate(updateLeague)

    }

    useEffect(() => {
        dispatch(fetchTimeRangeStart(timeRangeObject))
    }, [timeRangeObject])
    return (
        <div id="side-nav-left" className='s-nav__wrap'>
            <div className="s-nav__item">
                <FormGroup SideBarType/>
                <div className='s-nav__top-level__ul-wrap'>
                    <ul className='s-nav__list'>
                     {
                        leagueMain
                        ? leagueMain.map(({title, icon, active, id}, idx) => 
                        <li onClick={e => HandleClick(e, title, id, idx)} 
                            // onMouseEnter={e => HandleMouseEnter(e, idx)} 
                            // onMouseLeave={e => HandleMouseLeave(e, idx)} 
                            data-index={idx} key={idx} className='s-nav__list-item' 
                            title={title} id={`s-nav__list-item-${idx}`}>
                            <div className="s-nav__list-item__img-holder" data-index={idx}>
                                <span className="icon" data-index={idx}>{icon}</span>
                            </div>
                            <div className='s-nav__list-item__text' data-index={idx}>
                                <Link data-index={idx} className={`text ${active ? 'active-span' : null}`} 
                                    to="/" id={`s-nav__list-item-${idx}`} title={title}>{title}</Link>
                            </div>
                        </li>
                        )
                        : null
                     }
                     </ul>
                </div>
            </div>
            <div id="sport" className="s-nav__item">
                <div className="time-filter">
                    <div className="time-filter__image-holder">
                        <span className='icon-timer'>&#9776;</span>
                    </div>
                    <div className="time-filter__list">
                        {
                            time_range.map(({name, active}, idx) => 
                                <div key={idx}  
                                    onClick={e => HandleTimeRangeClick(e,idx)}
                                    className={`time-filter__item ${active ? 'active' : null}`}>
                                    <span className="time-filter__link">{name}</span>
                                </div>
                            )
                        }
                    </div>
                </div>
                <h1 className="head">SPORTS</h1>
                <Accordion AccordionHash={accordion_hash ? accordion_hash : []} SideNav/>
            </div>
        </div>
            
    )
}
export default SideNavLeft;
