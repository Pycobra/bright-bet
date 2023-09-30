import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./side-nav-right.styles.css";
import { selectAllAccumulatedBet } from "../../redux/betAccumulator/betAccumulator.selectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons"
import MyBetPage from "../../pages/mybetpage/mybetpage.components";
import BetSlip from "../bet-slip/bet-slip.components";




const SideNavRight = ({}) => {
    const userAccumulatedBet = useSelector(selectAllAccumulatedBet)
    const { user_accumulated_bet } = userAccumulatedBet
    const [side_right_nav, setSide_right_nav] = useState([{str:'Betslip', active:true}, {str:'My Bets', active:false}])
    const HandleClick = (e,index) => {
        const top_nav = side_right_nav.map(({str}, idx) => {
            const SideNav = document.querySelector("#side-nav-right")
            const MainContainer = document.querySelector("#side-nav-right").querySelector(".container.main")
            if (idx===index) {
                const width = window.innerWidth
                if(str==="Betslip" && width <= 768){
                    SideNav.classList.remove("adjust")
                    MainContainer.classList.remove("adjust")
                } else if(str!=="Betslip" && width <= 768){
                    SideNav.classList.add("adjust")
                    MainContainer.classList.add("adjust")
                }
                return {str, active:true}
            }
            else {
                return {str, active:false}
            }  
        })
        setSide_right_nav(top_nav)
    }

    return (
        <div id="side-nav-right" className='s-nav__wrap'>
            <div className="container main">
                <div className="header">
                    <div className="content">
                        {
                            side_right_nav.map(({str, active}, idx) => 
                                <div key={`${idx}${str}`}
                                    onClick={e => HandleClick(e, idx)}
                                    className={`s-nav__head-text${active ? ' active' : ' '}`}>
                                    <span>{str}</span><span className="btm-pallete"></span>
                                    {
                                        idx===0 && active
                                        ? <span className='bet-total'>{user_accumulated_bet.length}</span>
                                        : null

                                    }
                                </div> 
                            )
                        }
                    </div>
                </div>
                {
                    side_right_nav.map(({str, active}, idx) =>
                        active && idx===0
                        ? <BetSlip key={idx}/> : active && idx===1
                        ? <MyBetPage key={idx} /> : null
                    )
                }
                {
                    <footer className="side-nav-right__footer">
                        <div className="side-nav-right__footer-row-1">
                            <span className="color-break"></span>
                        </div>
                        <div className="side-nav-right__footer-row-2">
                            <span className="img-holder">
                                <div className="carousel">
                                    <img src={require("../../Media/soccer-pics/img-3.jpg")}/>
                                </div>
                                <div className="nav-icon">
                                    <span className="icon"><FontAwesomeIcon icon={faCaretLeft} /></span>
                                    <div>
                                        <span className="icon icon-1">.</span>
                                        <span className="icon icon-2">.</span>
                                        <span className="icon icon-3">.</span>
                                    </div>
                                    <span className="icon"><FontAwesomeIcon icon={faCaretRight} /></span>
                                </div>
                            </span>
                        </div>
                    </footer>
                }
            </div>
        </div>
    )
}

export default SideNavRight;


































