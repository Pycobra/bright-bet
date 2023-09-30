import React from 'react'; 
import { FallbackImageOverlay, FallbackImageContainer, FallbackImageText } from './fallback.style-component.jsx';




const Fallback = ({text, url, type}) => {
  return (
      <FallbackImageOverlay>
        {
            type === "img"
            ? <FallbackImageContainer imageUrl={url} />// : type === "gif" ? <img alt='' src={require("../../Media/gifs/Fidget-spinner.gif")}/>
            : null
        }
        <FallbackImageText>{text}</FallbackImageText>
      </FallbackImageOverlay>
  );
};
export default Fallback;