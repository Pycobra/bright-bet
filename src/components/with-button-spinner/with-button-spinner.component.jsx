import React from "react";
import { SpinnerContainer, SpinnerOverlay } from "./with-buton-spinner.styled-component.jsx";



const WithButtonSpinner = ({widthAndHeight, elemStr, borderColor, topBorderColor}) => 
    <SpinnerOverlay elemStr={elemStr}>
        <SpinnerContainer 
            elemStr={elemStr} 
            widthAndHeight={widthAndHeight} 
            borderColor={borderColor} 
            topBorderColor={topBorderColor}/>
    </SpinnerOverlay>
    

export default WithButtonSpinner;


