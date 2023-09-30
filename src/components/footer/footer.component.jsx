import React from "react";
import "./footer.styles.css";
import SiteLogo from "../site-logo/site-logo.component";



const Footer = ({}) => {
    return (
            <footer id="footer">
                <div className="wrap">
                    <div className="footer-item">
                        <div className="content">
                            <div className="footer-item__col">
                            </div>
                            <div className="footer-item__col">
                                <div className="footer-item__row">
                                    <div className="footer-list___wrap">
                                        <h1>BrightBet</h1>
                                        <ul className="footer-list">
                                            <li className="footer-list___item">Home</li>
                                            <li className="footer-list___item">About</li>
                                            <li className="footer-list___item">Become An Agent</li>
                                            <li className="footer-list___item">Contact Us</li>
                                            <li className="footer-list___item">Results</li>
                                            <li className="footer-list___item">Web Affiliate</li>
                                            <li className="footer-list___item">App</li>
                                        </ul>
                                    </div>
                                    <div className="footer-list___wrap">
                                        <ul className="footer-list">
                                            <li className="footer-list___item">Terms And Conditions</li>
                                            <li className="footer-list___item">Responsible Betting</li>
                                            <li className="footer-list___item">Privacy</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="footer-item__row">
                                    <span className="footer__icon-holder">&#9993;</span>
                                    <span className="footer__icon-holder">&#9993;</span>
                                    <span className="footer__icon-holder">&#9993;</span>
                                </div>
                            </div>
                            <div className="footer-item__col">
                                <SiteLogo />
                            </div>
                        </div>
                    </div>
                    <div className="footer-item">
                        <div className="content">
                            <div className="footer-item__col">
                                <div className="footer-item__row">
                                    <span className="footer__icon-holder">&#9993;</span><span className="footer__icon-holder">&#9993;</span><span className="footer__icon-holder">&#9993;</span>
                                    <span className="footer__icon-holder">&#9993;</span><span className="footer__icon-holder">&#9993;</span><span className="footer__icon-holder">&#9993;</span>
                                    <span className="footer__icon-holder">&#9993;</span><span className="footer__icon-holder">&#9993;</span><span className="footer__icon-holder">&#9993;</span>
                                </div>
                                <div className="footer-item__row">
                                    <span>2021 all right reseved</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-item">
                        <div className="content">
                            <div className="footer-item__col">
                                <div className="footer-item__row">
                                    BrightBet is not affiliated or connected with sports teams, events organisers and/or players displayed on it images/website
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
}
export default Footer;