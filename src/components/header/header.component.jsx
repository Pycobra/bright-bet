import React, { useEffect, useState } from "react";
import "./header.styles.css";
import { Link } from "react-router-dom";
import CustomButton from "../custom-button/custom-button.component"
import SiteLogo from "../site-logo/site-logo.component";
import { selectCurrentUser, selectStringsForHeaderLinks } from "../../redux/user/user.selector";
import { signOutStart } from "../../redux/user/user.action";
import { connect, useDispatch, useSelector } from "react-redux";
import { 
    registerFrameHiddenStart, loginFrameHiddenStart,
    headerDropDownStart
} from "../../redux/user/user.action";
import { createStructuredSelector } from "reselect";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faTimes, faUser } from "@fortawesome/free-solid-svg-icons"





const Header = ({currentUser, signOutStart, stringsForHeaderLinks}) => {
    const [timesAndBar, setTimesAndBar] = useState('bar')
    const [headerStrings, setHeaderStrings] = useState(
        stringsForHeaderLinks.filter((i, ind) => 
                        window.innerWidth <= 650 ? ind < 2
                        : window.innerWidth <= 768 ? ind < 3
                        : ind < 4)
    )
    const [activeAuthBtn, setActiveAuthBtn] = useState([
        {name:"REGISTER", active: false}, 
        {name:"LOGIN", active: false}
    ])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const HandleAuthDisplay = (e, str) => {
        const authBtn = activeAuthBtn.map(i => {
            if (i.name === str) i.active = true 
            else i.active = false
            return i
        })
        setActiveAuthBtn(authBtn)
        if (!currentUser){
            if (str==='LOGIN'){
                dispatch(loginFrameHiddenStart(true))
            }
            if (str==='REGISTER'){
                dispatch(registerFrameHiddenStart(true))
            }
        }
        if (!e.target.innerText){
            setTimeout(() => { 
                    adjustAccountDropDown(true)
                }, 1
            );
        }
        
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
    const {pathname} = useLocation()
    useEffect(() => {
     const  headerColor = document.querySelector("#header-item")
      if (pathname.split("/")[2] === "my_accounts" && headerColor){
        headerColor.classList.add("add-default")
      } else {
        headerColor.classList.remove("add-default")
      }
    })
    useEffect(() => {
        function reportWindowSize(){
            const strings = stringsForHeaderLinks.filter((i, ind) => 
                        window.innerWidth <= 650 ? ind < 2
                        : window.innerWidth <= 768 ? ind < 3
                        : ind < 4)
            setHeaderStrings(strings)
        }
        window.addEventListener("resize", reportWindowSize);
        return ()=> window.removeEventListener("resize", reportWindowSize);
    }, [])
    const HandleDropDown = (e, str) => {
        dispatch(headerDropDownStart({hidden: true, str}))
    }
    return (
        <header id="header-item">
            <div className="h-item">
                <div className="container">
                    <div className="h-item__wrap">
                        <div className="h-item__top-level">
                            <div className="h-item__top-level__col-1">
                                <SiteLogo />
                            </div>
                            <div className="h-item__top-level__col-2">
                                <nav className='h-item__nav'>
                                    <ul className='h-item__nav-list'>
                                        {
                                            headerStrings.map((str, ind) => 
                                            <li key={ind} className='h-item__nav-item'>
                                                <Link to="/" className="h-item__nav-link active" id="header__staticlink__sport">{str}</Link>
                                            </li>)
                                        }
                                        <li className='h-item__nav-item more'
                                            onMouseOver={e => HandleDropDown(e, "header-links")}>
                                            <span className="h-item__nav-link" id="header__staticlink__sport">MORE</span>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                            
                            <div className="h-item__top-level__col-3">
                                {
                                    !currentUser
                                    ? 
                                    <div className="h-item__acc">
                                        {
                                            activeAuthBtn.map((i, ind) => 
                                                <div data-hover="pop-up" key={ind} className={`h-item__acc-item ${i.name} pop-up`}>
                                                    <CustomButton buttonType="TriggerButton"
                                                        onMouseOver={e => HandleAuthDisplay(e, i.name)}>
                                                        {i.name}
                                                    </CustomButton>
                                                </div>
                                            )
                                        }
                                    </div>
                                    : <div className="h-item__acc account">
                                        <div data-hover="pop-up" className='h-item__acc-item acct-btn pop-up'>
                                            <CustomButton buttonType="TriggerButton"
                                                onMouseOver={e => HandleDropDown(e, "Account")}>
                                                {
                                                    currentUser
                                                    ? <img style={{width:'20px',height:'20px',objectFit:"cover",borderRadius:"50px"}} 
                                                            src={require(`../../Media/soccer-pics/img-3.jpg`)}/>
                                                    :<FontAwesomeIcon icon={faUser} />
                                                }
                                            </CustomButton>
                                        </div>
                                        <div className={`h-item__acc-item`}>
                                            <span>MAIN ACCOUNT</span>
                                            <span>
                                                {
                                                    currentUser
                                                    ? currentUser.amount.toLocaleString('en-US', {
                                                        style: 'currency',
                                                        currency: "NGN"
                                                      })
                                                    : null
                                                }
                                            </span>
                                        </div>
                                    </div>
                                }
                                <div className="h-item__acc account2">
                                     <div data-hover="pop-up" className='h-item__acc-item b acct-btn pop-up'>
                                        <CustomButton buttonType="TriggerButton"
                                            onMouseOver={e => {
                                                if (currentUser) {
                                                    HandleDropDown(e, "Account")
                                                } else {
                                                    HandleAuthDisplay(e, "LOGIN")
                                                }
                                            }}
                                            >
                                            {
                                                currentUser
                                                ? <img style={{width:'20px',height:'20px',objectFit:"cover",borderRadius:"50px"}} 
                                                        src={require(`../../Media/soccer-pics/img-3.jpg`)}/>
                                                :<FontAwesomeIcon icon={faUser} />
                                            }
                                        </CustomButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}


const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    stringsForHeaderLinks: selectStringsForHeaderLinks
})

const mapDispatchToProps = (dispatch) => ({
   signOutStart: () => dispatch(signOutStart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);


