import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
    faHockeyPuck, faSoccerBall, faBasketball, faTableTennis, 
    faBaseball, faBaseballBatBall, faVolleyball, faHandsClapping
} from "@fortawesome/free-solid-svg-icons"







export const AccordionHash = {
    main: [
        {title: 'Soccer', icon: <FontAwesomeIcon icon={faSoccerBall} />, active:false}, 
        {title: 'Special Soccer', icon: <FontAwesomeIcon icon={faSoccerBall} />, active: false}, 
        {title: 'Zoom Soccer', icon: <FontAwesomeIcon icon={faSoccerBall} />, active: false}, 
        {title: 'Antepost Soccer', icon: <FontAwesomeIcon icon={faSoccerBall} />, active: false}, 
        {title: 'Player Soccer', icon: <FontAwesomeIcon icon={faSoccerBall} />, active: false}, 
        {title: 'Tennis', icon: <FontAwesomeIcon icon={faTableTennis} />, active: false}, 
        {title: 'BasketBall', icon: <FontAwesomeIcon icon={faBasketball} />, active: false}, 
        {title: 'Special BasketBall', icon: <FontAwesomeIcon icon={faBasketball} />, active: false}, 
        {title: 'American Football', icon: <FontAwesomeIcon icon={faVolleyball} />, active: false}, 
        {title: 'BaseBall', icon: <FontAwesomeIcon icon={faBaseball} />, active: false}, 
        {title: 'HandBall', icon: <FontAwesomeIcon icon={faSoccerBall} />, active: false}, 
        {title: 'Rugby', icon: <FontAwesomeIcon icon={faBaseballBatBall} />, active: false}, 
        {title: 'VolleyBall', icon: <FontAwesomeIcon icon={faVolleyball} />, active: false}, 
        {title: 'Ice Hockey', icon: <FontAwesomeIcon icon={faHockeyPuck} />, active: false}, 
        {title: 'Waterpollo', icon: <FontAwesomeIcon icon={faSoccerBall} />, active: false}, 
        {title: 'Boxing', icon: <FontAwesomeIcon icon={faHandsClapping} />, active: false}, 
        {title: 'Cricket', icon: <FontAwesomeIcon icon={faSoccerBall} />, active: false}, 
        {title: 'Table Tennis', icon: <FontAwesomeIcon icon={faTableTennis} />, active: false}, 
        {title: 'Squash', icon: <FontAwesomeIcon icon={faBaseball} />, active: false}, 
        {title: 'Futsal', icon: <FontAwesomeIcon icon={faSoccerBall} />, active: false}, 
        {title: 'FloorBall', icon: <FontAwesomeIcon icon={faVolleyball} />, active: false}, 
        {title: 'Specials', icon: <FontAwesomeIcon icon={faBasketball} />, active: false}, 
        {title: 'Outright', icon: <FontAwesomeIcon icon={faBaseball} />, active: false}
    ],
    livebetting: [
        {title: 'Soccer', icon: <FontAwesomeIcon icon={faSoccerBall} />, active:true}, 
        {title: 'Tennis', icon: <FontAwesomeIcon icon={faTableTennis} />, active: false}, 
        {title: 'BasketBall', icon: <FontAwesomeIcon icon={faBasketball} />, active: false},
        {title: 'VolleyBall', icon: <FontAwesomeIcon icon={faVolleyball} />, active: false}, 
        {title: 'Ice Hockey', icon: <FontAwesomeIcon icon={faHockeyPuck} />, active: false}, 
        {title: 'Table Tennis', icon: <FontAwesomeIcon icon={faTableTennis} />},
    ],
    upcoming: [
        {title: 'Soccer', icon: <FontAwesomeIcon icon={faSoccerBall} />, active:true}, 
        {title: 'Tennis', icon: <FontAwesomeIcon icon={faTableTennis} />, active: false}, 
        {title: 'BasketBall', icon: <FontAwesomeIcon icon={faBasketball} />, active: false},
        {title: 'BaseBall', icon: <FontAwesomeIcon icon={faBaseball} />, active: false}, 
        {title: 'HandBall', icon: <FontAwesomeIcon icon={faSoccerBall} />, active: false}, 
        {title: 'Rugby', icon: <FontAwesomeIcon icon={faVolleyball} />, active: false},
    ]
}
