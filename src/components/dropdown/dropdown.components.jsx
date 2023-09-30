import React, { useEffect, useState } from "react";
import "./dropdown.styles.css";
import { connect, useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { headerDropDownStart } from "../../redux/user/user.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretUp } from "@fortawesome/free-solid-svg-icons"
import { 
  selectHeaderDropDown, selectHeaderDropdownActiveStr,
  selectRegisterationHidden, selectLoginHidden, selectCurrentUser
} from '../../redux/user/user.selector.js';
import { Link, useNavigate } from "react-router-dom";
import { signOutStart } from "../../redux/user/user.action";





const DropDown = ({list, currentUser, header_dropdown, headerDropdownActiveStr}) => {
    const [listItems, setListItems] = useState(
        list.filter((i, ind) => 
        headerDropdownActiveStr === "header-links"
        ? (window.innerWidth <= 650 ? ind >= 2
            : window.innerWidth <= 768 ? ind >= 3
            : ind >= 4)
        : list)
    )
    
    useEffect(() => {
        if (headerDropdownActiveStr === "header-links"){
            function reportWindowSize(){
                var  items = list.filter((i, ind) => 
                        window.innerWidth <= 650 ? ind >= 2
                        : window.innerWidth <= 768 ? ind >= 3
                        : ind >= 4)
                setListItems(items)
            }
            window.addEventListener("resize", reportWindowSize);
            return ()=> window.removeEventListener("resize", reportWindowSize);
        }
    }, [])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const HandleClick = (e) => {
        const {name} = e.target.dataset
        if (currentUser){
            dispatch(headerDropDownStart({hidden: false}))
            if (name==="TRANSACTIONS") {
                navigate(`/${currentUser.id}/my_accounts/transaction`)
            }
            else if (name==="ACCOUNT SETTING") {
                navigate(`/${currentUser.id}/my_accounts/account-setting`)
            }
            else if (name==="DEPOSIT & WITHDRAW") {
                navigate(`/${currentUser.id}/my_accounts/deposit-and-withdrawal`)
            }
            else if (name==="BET HISTORY") {
                navigate(`/${currentUser.id}/my_accounts/bet_history/sport_bets`)
            }
            else if (name==="LOGOUT") {
                dispatch(signOutStart())
            }
        }
    }
    return (
        <div className="dropdown">
            <div className="dropdown__content">
                <FontAwesomeIcon icon={faCaretUp} style={{}} />
                <ul className="dropdown__item">
                    {
                        currentUser
                        ? (header_dropdown && headerDropdownActiveStr === "Account"
                            ? <li className="dropdown__item-acc">
                                <span>MAIN ACCOUNT</span>
                                <span>
                                    {
                                        currentUser.amount.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: "NGN"
                                        })
                                    }
                                </span>
                            </li>
                            : null)
                        : null
                    }
                    {
                        listItems.map((str, ind) => 
                            <li key={ind}
                                data-name={str} 
                                onClick={(e) => HandleClick(e)}> 
                                {str}
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}
const mapStateToProps = createStructuredSelector({
    header_dropdown: selectHeaderDropDown,
    headerDropdownActiveStr: selectHeaderDropdownActiveStr,
    currentUser: selectCurrentUser,
})

export default connect(mapStateToProps)(DropDown);


































