import React, { useState, useEffect } from "react";
import "./accordion.styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faCaretRight, faCaretUp } from "@fortawesome/free-solid-svg-icons"
import { selectFromCountriesAndLeague } from "../../redux/bet/bet.selectors";
import { createStructuredSelector} from "reselect"; 
import { connect, useDispatch } from 'react-redux';
import { fetchLeagueStart, topNavTriggered } from "../../redux/bet/bet.action";
import { useNavigate } from "react-router-dom";



const Accordion = ({countries, AccordionHash, SideNav, MainContentCard, MainContent}) => {
    const [clickedGrandChild, setClickedGrandChild] = useState()
    const [clickedParent, setClickedParent] = useState()
    const [clickedChild, setClickedChild] = useState()
    const [directory, setDirectory] = useState({
        grandparent:undefined, parent:undefined, 
        child:{id:null, name:undefined
    }})
    const {grandparent, parent, child} = directory
    const [accordionActivate, setAccordionActivate] = useState([])
    const [countriesAsChild, setCountriesAsChild] = useState([])
    useEffect(() => {
        setAccordionActivate(AccordionHash)
        setCountriesAsChild(countries)
        setClickedGrandChild(Array.from(AccordionHash).fill(false))
        setClickedParent(Array.from(AccordionHash).map((obj,idx) => obj.active ? true : false))
        setClickedChild(Array.from(countries).map((obj,idx) => obj.active ? true : false))
    }, [AccordionHash,countries ])
    const HandleClick = (e, position, place, obje) => {
        e.stopPropagation()
        const event = e.currentTarget
        if (place === 'SideNavChild'){
            const clickedState = clickedChild.map((obj, index) => index === position ? !obj : false); 
            setClickedChild(clickedState)
            setDirectory({...directory, parent:obje})
        }
        else if (place === 'SideNavGrandChild'){
            const clickedState = clickedGrandChild.map((obj, index) => index === position ? !obj : false); 
            setClickedGrandChild(clickedState)
            setDirectory({...directory, child:{name:obje.name, id:obje.id}})
            dispatch(topNavTriggered(false))
        }
        else { 
            if (place === 'SideNav'){
                const clickedState = clickedParent.map((obj, index) => index === position ? !obj : false); 
                setClickedParent(clickedState)
                const updateAccordion = accordionActivate.map((obj, index) => 
                    index === position ? {...obj, 'active': !obj.active} : {...obj, 'active': false}); 
                setAccordionActivate(updateAccordion)
                const allChild = clickedChild.map(() => false); 
                setClickedChild(allChild)
                setDirectory({...directory, grandparent:obje})
            }
            if (place === 'MainContentCard' || place === 'MainContent'){
                const updateAccordion = accordionActivate.map((obj, index) => 
                index === position ? {...obj, 'active': true} : {...obj, 'active': false}); 
                setAccordionActivate(updateAccordion)  
            }
        }
    }

    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (child.id){
            dispatch(fetchLeagueStart(child.id))
            navigate(`/sporttype/${grandparent}/${parent}/${child.name}/${child.id}`)
        }
    }, [directory])

    return (
            <div id="accordion" className={`${MainContentCard ? 'm-c-card' : MainContent ? 'm-content' : 's-nav'}`}>
                <div className={`accordion-wrap ${MainContentCard ? 'm-c-card' : MainContent ? 'm-content' : 's-nav'}`}>
                    <ul className="accordion-content">
                    {
                        accordionActivate
                        ? 
                        accordionActivate.map(({title, icon, active}, grandParentIdx) => 
                            (<li 
                                onClick={e => {
                                    let place
                                    MainContent ? place = 'MainContent'
                                    : MainContentCard ? place = 'MainContentCard'
                                    :  place = 'SideNav'
                                    return HandleClick(e, grandParentIdx, place, title)
                                }} 
                                 data-index={grandParentIdx} key={grandParentIdx}  title={title} id={`accordion${grandParentIdx}`}
                                 className={`accordion-item ${active ? 'active-li' : null}`}>
                                <div className="accordion-item__main-item">
                                    <div className="accordion-item-col" data-index={grandParentIdx}>
                                        <div className={`accordion-item__img-holder top ${active ? 'active-span' : null}`}
                                            data-index={grandParentIdx}>
                                            <span className="icon">{icon}</span>
                                        </div>
                                        <div className={`accordion-item__text ${active ? 'active-span' : null}`}
                                            data-index={grandParentIdx}>
                                            <span className="text" data-index={grandParentIdx}>{title}</span>
                                        </div>
                                    </div>
                                    {SideNav
                                    ? <div data-index={grandParentIdx} className={`accordion-item__img-holder btm`}> 
                                        <span className="icon" data-index={grandParentIdx}>
                                            {active ? null : <FontAwesomeIcon icon={faCaretDown} />}
                                        </span>
                                    </div>
                                    : MainContentCard
                                    ? <div data-index={grandParentIdx} className={`accordion-item__img-holder btm ${active ? 'active-span' : null}`}>
                                        <span className="icon" data-index={grandParentIdx}><FontAwesomeIcon icon={faCaretUp} /></span>
                                    </div>
                                    : null}
                                </div>
                                <div className="accordion-item__sub-item">
                                    {
                                    SideNav && clickedParent[grandParentIdx]
                                    ? <ul className="list-item__s-nav"> 
                                        {
                                            countriesAsChild.map(({icon, name, leagues}, parentIdx) => {
                                                    return (
                                                        <li 
                                                            onClick={e => HandleClick(e, parentIdx, "SideNavChild", name)} 
                                                            key={parentIdx} className="list-item__s-nav__item">
                                                            <div className="list-item__s-nav__item-main">
                                                                <div className="main-col">
                                                                    <span className="country-holder">
                                                                        <img src={`https://flagcdn.com/16x12/${icon}.png`} alt=""/>
                                                                    </span>
                                                                    <div className='list-item__s-nav__item__text' data-index={parentIdx}>
                                                                        <span className="text">{name}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="list-item__s-nav__item__img-holder" data-index={parentIdx}>
                                                                    <span className="icon" data-index={parentIdx}>
                                                                        <FontAwesomeIcon icon={clickedChild[parentIdx] ? faCaretDown : faCaretRight} className="icon"/>
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            {clickedChild[parentIdx]
                                                                ? <ul className="list-item__s-nav__item-list">
                                                                {
                                                                    leagues.map(({name, id}, childIdx) => (
                                                                    <li 
                                                                        onClick={e => HandleClick(e, childIdx, "SideNavGrandChild", {name, id})}  
                                                                        key={childIdx} className="list-item">
                                                                        <div className="main-col">
                                                                            <div className='list-item__text' data-index={parentIdx}>
                                                                                <span className="text">{name}</span>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                ))
                                                                }
                                                            </ul>
                                                            : null}
                                                        </li>
                                                    )
                                            
                                            })
                                        }
                                    </ul>
                                    : null
                                    }
                                </div>
                            </li>)
                        )
                        : null
                    }
                    </ul>
                </div>
            </div>
    )
}
const mapStateToProps = createStructuredSelector({
    countries: selectFromCountriesAndLeague,
})
export default connect(mapStateToProps)(Accordion);


