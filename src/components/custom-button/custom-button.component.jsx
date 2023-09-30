import React from "react";
import "./custom-button.styles.css";


const CustomButton = ({children, active, isFetching, buttonType, ...otherProps}) => (
    <button className={`${
        (buttonType==="FlatButton") ? "flat-button" 
        : (buttonType === "MajorButton register") ? "major-btn register" 
        : (buttonType === "MajorButton") ? `major-btn${active ? ' active' : ''}` 
        : (buttonType === "MyBetButton") ? `my-bet-btn${active ? ' active' : ''}`
        : (buttonType === "MyBetButton2") ? `my-bet-btn2${active ? ' active' : ''}`
        : (buttonType === "TriggerButton") ? `trigger-btn${active ? ' active' : ''}`
        : ''} custom-button`} {...otherProps}>
        { children }
    </button>
)
export default CustomButton;