import React, { useEffect, useRef, useState } from 'react';
import "./bottom-pallete.styles.css"
import { useNavigate, useLocation } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAllAccumulatedBet } from "../../redux/betAccumulator/betAccumulator.selectors";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignIn, faUser } from '@fortawesome/free-solid-svg-icons';
import { 
    registerFrameHiddenStart, loginFrameHiddenStart,
} from "../../redux/user/user.action";
import { selectLoginHidden, selectRegisterationHidden, selectHeaderDropdownActiveStr } from '../../redux/user/user.selector';






const BottomPallete = ({currentUser, dropdown_str}) => {
    const userAccumulatedBet = useSelector(selectAllAccumulatedBet)
    const { user_accumulated_bet } = userAccumulatedBet
    const navigate = useNavigate()
    const [palleteText, setPalleteText] = useState([{
        icon:<FontAwesomeIcon icon={faHome} />, name:"HOME", active:true},
        {icon:<>&#10041;</>, name:"MY BET", active:false},
        {icon:<>&#9833;</>, name:"BET SLIP", active:false},
        {icon:<FontAwesomeIcon icon={faSignIn} />, name:"CHECK BET", active:false},
        {icon:<FontAwesomeIcon icon={faUser} />, name:"REGISTER", active:false}])
    const dispatch = useDispatch()
    const HandleAuthDisplay = (e, text) => {
        if (!currentUser){
            if (text==='LOGIN'){
                dispatch(loginFrameHiddenStart(true))
            }
            if (text==='REGISTER'){
                dispatch(registerFrameHiddenStart(true))
            }
        } 
        setTimeout(() => { 
                adjustAccountDropDown(true)
            }, 1
        );
    }
    const adjustAccountDropDown = (bool) => {
        const modal = document.querySelector(".modal.active")
        const modal2 = document.querySelector(".modal.active-b")
        if (modal && bool){
            modal.classList.remove("active")
            modal.classList.add("active-b")
        } else if (modal2 && !bool){
            modal2.classList.remove("active-b")
            modal2.classList.add("active")
        }
    }
    
    const HandleClick = (e, id) => {
        const pallete = palleteText.map((itm, ind) => 
            id === ind ? {...itm, active:true} : {...itm, active:false}
        )
        setPalleteText(pallete)
    }
    const [displayNewElement, setDisplayNewElement] = useState(false)
    const removableElem = useRef()
    const HandleBetFrame = (e) => {
        const newElement = document.createElement('div')
        const newElementInDom = document.querySelector("#new-element2")
        const Wrap = document.querySelector("aside.right-side .wrap")
        const bottomPallete = document.querySelector('#bottom-pallete .b-p__wrap .b-p__block:last-child')
        newElement.id = 'new-element2'
        if (window.innerWidth <= 768) {
            if (!newElementInDom) {
                var Cancel = document.createElement('span')
                Cancel.className = "cancel"
                Cancel.onclick = () => setDisplayNewElement(false)
                Cancel.innerHTML = `<span>&#10005;</span>`
                if (!removableElem.current) {
                    var SideNav = document.querySelector('#side-nav-right')
                    removableElem.current={SideNav, Cancel }
                }
                var { SideNav, Cancel } = removableElem.current
                newElement.style.display = "none"
                // newElement.style.zIndex = "1"
                newElement.insertAdjacentElement('afterbegin', SideNav)
                newElement.insertAdjacentElement('afterbegin', Cancel)
                bottomPallete.insertAdjacentElement('afterbegin', newElement)
            } 
            if (displayNewElement && newElementInDom) {
                if (newElementInDom.style.display === "none") {
                    newElementInDom.style.display = "grid"
                }
            }
            else if (!displayNewElement && newElementInDom) {
                if (newElementInDom.style.display === "grid") {
                    newElementInDom.style.display = "none"
                }
            }
        } else if (window.innerWidth > 768) {
            if (newElementInDom){
                var SideNav = newElementInDom.querySelector('#side-nav-right')
                const Cancel = newElementInDom.querySelector('.cancel')
                removableElem.current={SideNav, Cancel}
                newElementInDom.remove()
                var { SideNav }= removableElem.current
                Wrap.insertAdjacentElement('afterbegin', SideNav)
            }
        }
    }
    useEffect(() => {
        HandleBetFrame()
    }, [displayNewElement])
    useEffect(() => {
        window.addEventListener("resize", HandleBetFrame);
        return ()=> window.removeEventListener("resize", HandleBetFrame);
    }, [])

    const [totalOdds,setTotalOdds] = useState(0)
    useEffect(() => {
        let odd=1
        user_accumulated_bet.map( itm => odd=odd * itm.odd)
        if (odd===1.00)setTotalOdds(0);
        else setTotalOdds(odd.toFixed(2));
    }, [user_accumulated_bet.length])
    return (
        <div id="bottom-pallete">
            <div className='b-p__wrap'>
                <div className='b-p__block'>
                    <ul className='b-p__list'>
                        {
                            palleteText.map(({name, icon, active}, id) => 
                                id !== 2 ?    
                                <li key={id} className={`b-p__list-item ${active ? "active" : ""}`} onClick={e => {
                                    HandleAuthDisplay(e, name)
                                    HandleClick(e, id)
                                    if (name==="MY BET" && currentUser) {
                                        navigate(`/${currentUser.id}/my_accounts/bet_history/sport_bets`)
                                    }
                                }}>
                                    <span className='b-p__img-holder'>{icon}</span>
                                    <span>{name}</span>
                                </li>
                                :<li key={id} onClick={e => {
                                    HandleClick(e, id)
                                    setDisplayNewElement(!displayNewElement)
                                    }} className='b-p__list-item'>
                                    <div className='wrap'>
                                        <span>{totalOdds}</span>
                                        <span>{user_accumulated_bet.length}</span>
                                        <span>{name}</span>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div className='b-p__block'>
                </div>
            </div>
        </div>
    )
 };

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    register_hidden: selectRegisterationHidden,
    dropdown_str: selectHeaderDropdownActiveStr,
    login_hidden: selectLoginHidden,

})

export default connect(mapStateToProps)(BottomPallete);
