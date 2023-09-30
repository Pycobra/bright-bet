import React, { useEffect, useState, useContext, useLayoutEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./main-content.styles.css";
import MainContentCard from "../main-content-card/main-content-card.components";
import { createStructuredSelector} from "reselect"; 
import { connect, useSelector } from 'react-redux';
import { selectLeagueNames } from '../../redux/bet/bet.selectors';
import { selectAccordion, selectLeagueToDisplay } from "../../redux/bet/bet.selectors";
import ImageSlide from "../image-slideshow/image-slideshow.components";
import { selectTopVNavTrigerred } from "../../redux/bet/bet.selectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import SlideSideBar from "../slide-side-bar/slide-side-bar.components";
import SporttypePage from "../../pages/sporttype-page/sporttype-page";





const MainContent = () => {
    const [headings, setHeading] = useState([{title: 'Soccer', active: false, icon: <FontAwesomeIcon icon={faEnvelope}/>},
        {title: 'Live', active: false, icon: <FontAwesomeIcon icon={faEnvelope}/>},
        {title: 'Live Casino', active: false, icon: <FontAwesomeIcon icon={faEnvelope}/>}, {title: 'Play', active: false, icon: <FontAwesomeIcon icon={faEnvelope}/>},
        {title: 'Virtual', active: false, icon: <FontAwesomeIcon icon={faEnvelope}/>}, {title: 'Lotto', active: false, icon: <FontAwesomeIcon icon={faEnvelope}/>},
        {title: 'Super9ja', active: false, icon: <FontAwesomeIcon icon={faEnvelope}/>}, {title: 'FireBets', active: false, icon: <FontAwesomeIcon icon={faEnvelope}/>},
        {title: 'Promotions', active: false, icon: <FontAwesomeIcon icon={faEnvelope}/>}])
    const accordion_hash1 = useSelector(selectAccordion('MainContent'))
    const accordion_hash2 = useSelector(selectAccordion('LIVEBETTING'))
    const accordion_hash3 = useSelector(selectAccordion('UPCOMING'))
    const leagueNames = useSelector(selectLeagueNames)
    const gamesAvailableForDisplay = useSelector(selectLeagueToDisplay)
    const topNavTriggered = useSelector(selectTopVNavTrigerred)
    const [currentClick, setCurrentClick] = useState({currentClickOpt:'options1', currentClickPos:0})
    const HandleSpanClick = (e, position, place) => {
        setCurrentClick({currentBtn:e, currentClickOpt:place, currentClickPos: position})
    }

    useEffect(() => {
        const seed = document.querySelector('.league-card__item:nth-child(1)')
        if (seed){
            seed.setAttribute('style', 'align-self: flex-end;')
        }
    })
    const [navURL, setNavURL] = useState(null)
    const {pathname} = useLocation()
    useEffect(() => {
        if (pathname.split("/")[1] === "sporttype"){
            setNavURL('/sporttype/:sporttype/:country/:competition/:gameID')
        }
        else if (pathname.split("/")[1] === "popularCoupons"){
            setNavURL('/popularCoupons/:competition/:gameID')
        }
    }, [pathname])
    
    
    function AccordionHandler(){
        const newElement = document.createElement('div')
        const newElementContainer = document.createElement('div')
        const h1 = document.createElement('h1')
        const Acccordion = document.querySelector("#accordion")
        const SideNavItem = document.querySelector("#sport.s-nav__item")
        const newElementInDom = document.querySelector("#new-element1")
        const domFrame = document.querySelector('.m-con-item__wrap .m-con-item__row:nth-child(3)')
        newElement.id = 'new-element1'
        newElementContainer.id = 'new-element-container'
        if (window.innerWidth <= 768) {
            if (!newElementInDom) {
                h1.innerText = "Sport"
                h1.style.color = "var(--brown16)"
                h1.style.backgroundColor = "var(--brown27)"
                h1.style.border = "1px solid var(--brown25)"
                h1.style.fontSize = "17px"
                h1.style.padding = "10px 5px"
                newElement.style.marginBottom = "20px"
                newElement.style.border = "1px solid var(--major)"
                newElementContainer.style.height = "27vh"
                newElementContainer.style.overflowY = "scroll"
                newElementContainer.insertAdjacentElement('afterbegin', Acccordion)
                newElement.insertAdjacentElement('afterbegin', newElementContainer)
                newElement.insertAdjacentElement('afterbegin', h1)
                domFrame.insertAdjacentElement('afterbegin', newElement)
            }
        } else {
            if (newElementInDom){
                newElementInDom.remove()
                Acccordion.style.marginBottom = "0"
                Acccordion.style.border = "none"
                SideNavItem.insertAdjacentElement('beforeend', Acccordion)
            }
        }
    }
    
    useEffect(() => {
        AccordionHandler()
        window.addEventListener("resize", AccordionHandler);
        return ()=> window.removeEventListener("resize", AccordionHandler);
    }, [])
    
    
    return (
        <div id="main-content">
            <SlideSideBar />
            <div id="m-con-item">
                <div className="container">
                    <div className="m-con-item__wrap">
                        <div className="m-con-item__row">
                            <div className="content">
                                <ul className='m-con-item__list'>
                                    {
                                    headings.map(({title,icon, active}, idx) => 
                                    <li key={idx} className='m-con-item__list-item' title={title} id={`s-nav__list-item-${idx}`}>
                                        <div>
                                            <span className="icon">{icon}</span>
                                            <Link className={active ? 'active-link' : null} 
                                                to="/" id={`m-con-item__list-item-${idx}`} title={title}>{title}
                                            </Link>
                                        </div>
                                    </li>)
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="m-con-item__row">
                            {
                                !topNavTriggered || !gamesAvailableForDisplay.length ?  <ImageSlide /> : null
                            }
                        </div>
                        <div className="m-con-item__row">
                        </div>
                        <div className="m-con-item__row">
                            {
                                topNavTriggered
                                ? <ul className='m-con-item__list'>
                                    {
                                        leagueNames.map(({title, icon, active}, pos) => 
                                            gamesAvailableForDisplay.map((data, idx) => {
                                                const fixtureByTime = Object.keys(data)[0]
                                                const {items, id, name} = data[fixtureByTime]
                                                return idx===0 
                                                    ? 
                                                    <li onClick={e => HandleSpanClick(e)} 
                                                        key={idx} id={`m-con-item__list-item-${idx}`}
                                                        className={`m-con-item__list-item ${name === title ? ' active-span' : null}`}>
                                                        {title}
                                                    </li>
                                                    : null
                                            })
                                            )
                                    }
                                    <li className='l-card__list-item' title="empty">
                                        <span to="/" title="empty"></span>
                                    </li>
                                    <li className='l-card__list-item' title="empty">
                                        <span to="/" title="empty"></span>
                                    </li>
                                    <li className='l-card__list-item' title="empty">
                                        <span to="/" title="empty"></span>
                                    </li>
                                </ul>
                                : null
                            }
                        </div>
                        {
                            !gamesAvailableForDisplay.length
                            ? <section className="m-con-item__row">
                                <MainContentCard AccordionHash={accordion_hash3 ? accordion_hash3 : []} CardType='Upcoming' />
                            </section>
                            : null
                        }
                        <section className="m-con-item__row">
                            <Routes>
                                <Route  
                                    path={navURL} 
                                    element={<SporttypePage gamesAvailableForDisplay={gamesAvailableForDisplay}/>} 
                                    />           
                            </Routes>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainContent;







