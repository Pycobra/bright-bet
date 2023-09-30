import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./landingpage.css"
import SideNav from '../../components/side-nav/side-nav.components';
import { connect } from 'react-redux';
import { fetchAccordionHashStart } from "../../redux/bet/bet.action";
import MainContent from '../../components/main-content/main-content.components';
import BottomPallete from '../../components/bottom-pallete/bottom-pallete.component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
    faHockeyPuck, faSoccerBall, faBasketball, faTableTennis, 
    faBaseball, faBaseballBatBall, faVolleyball, faHandsClapping
} from "@fortawesome/free-solid-svg-icons"
import { useEffect } from 'react';


const Homepage = ({fetchAccordionHashStart2}) => {
    useEffect(() => {
        fetchAccordionHashStart2()
    },[])

    return (
        <div className='home-page'>
            <div className="home-page__wrap">
                <div className="sport-toolbar__item">
                    <div className="sport-toolbar__wrap">
                        <div className="sport-toolbar__col">
                            <div className="sport-toolbar__time">
                                <div className="sport-toolbar__timezone">09:03&nbsp;Africa/Lagos</div>
                            </div>
                            
                            <ul className="sport-toolbar__nav">
                                <li className="sport-toolbar__nav-item">
                                    <Link to="/" className="sport-toolbar__nav-link">Help</Link>
                                </li>
                                <li className="sport-toolbar__nav-item">
                                    <Link to="/" className="sport-toolbar__nav-link">Stat</Link>
                                </li>
                                <li className="sport-toolbar__nav-item">
                                    <Link to="/" className="sport-toolbar__nav-link">Live&nbsp;Score</Link>
                                </li>
                                <li className="sport-toolbar__nav-item">
                                    <Link to="/" className="sport-toolbar__nav-link">Coupon&nbsp;Check</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="sport-toolbar__col">
                            <div className="sport-toolbar__info">
                                <Link to="/">Show Match ID</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{zIndex:'1'}} className="home-page__main-content">
                    <SideNav Leftside />
                    <MainContent />
                    <SideNav Rightside />
                </div>
                <BottomPallete />
            </div>
        </div>
    )
 };
 const mapDispatchToProps = dispatch => ({
     fetchAccordionHashStart2: () => dispatch(fetchAccordionHashStart())
 })
 export default connect(null, mapDispatchToProps)(Homepage);










 
