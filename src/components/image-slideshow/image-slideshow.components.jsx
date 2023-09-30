import React, { useEffect } from "react";
import "./image-slideshow.styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faVolleyball } from "@fortawesome/free-solid-svg-icons"



const ImageSlide = () => {
    const delay = 5000;
    const images= ['img-1', 'img-4', 'img-3']
    const [index, setIndex] = React.useState(0);
    const timeoutRef = React.useRef(null);
    function resetTimeout() {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }
      
    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
          () =>
            setIndex((prevIndex) =>
              prevIndex === images.length - 1 ? 0 : prevIndex + 1
            ),
          delay
        );
    
        return () => {
            resetTimeout();
        };
      }, [index]);
    return (
        <div id="slideshow" style={{userSelect:'none'}}>
            <div className="slideshow-slider"
              style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                {
                    images.map((img,idx) => 
                        <div key={idx} className="slide">
                            <img src={require(`../../Media/soccer-pics/${img}.jpg`)}/>
                        </div>
                    )
                }
            </div>
            <div className="slideshowDots">
                {images.map((_, idx) => (
                <div key={idx} 
                    onClick={() => setIndex(idx)}
                    className={`slideshowDot ${index === idx ? "active" : ""}`}>
                         <FontAwesomeIcon icon={faVolleyball} />
                </div>
                ))}
            </div>
        </div>
    )
}
 export default ImageSlide;


