import React, { useState, useEffect } from "react";
import "./slide-side-bar.styles.css";
import { createStructuredSelector} from "reselect"; 
import { connect, useDispatch, useSelector } from 'react-redux';
import Accordion from "../accordion/accordion.components";
import { selectAccordion } from "../../redux/bet/bet.selectors";



const SlideSideBar = () => {
    const accordion_hash = useSelector(selectAccordion('SIDENAV'))
    return (
        <div id="slide-side-bar">
            <div className="container">
                <Accordion AccordionHash={accordion_hash ? accordion_hash : []} SideNav/>
            </div>
        </div>
    )
}
export default SlideSideBar;


