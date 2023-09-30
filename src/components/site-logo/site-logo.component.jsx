import React from "react";
import "./site-logo.styles.css";
import { Link } from "react-router-dom";






const SiteLogo = ({}) => {
    return (
            <div className='site-logo'>
                <Link to="/" className='site-logo-icon'><span>BRIGHT</span><span>Bet</span></Link>
            </div>
    )
}
export default SiteLogo;


