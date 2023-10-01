import React, { useEffect, useLayoutEffect }  from 'react';
import './modal.styles.css'
import { selectBetFrameHidden } from '../../redux/bet/bet.selectors.js';
import { createStructuredSelector} from "reselect"; 
import { connect, useDispatch } from 'react-redux';
import { 
  selectHeaderDropDown, selectHeaderDropdownActiveStr,
  selectRegisterationHidden, selectLoginHidden 
} from '../../redux/user/user.selector.js';
import Register from '../register/register.componenets.jsx';
import DropDown from '../dropdown/dropdown.components';
import Login from '../login/login.componenets.jsx';
import BookingCode from '../booking-code/booking-code.components.jsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretUp, faTimes } from "@fortawesome/free-solid-svg-icons"
import { headerDropDownStart, loginFrameHiddenStart, registerFrameHiddenStart } from '../../redux/user/user.action';
import { betFrameHidden } from '../../redux/bet/bet.action';



const Modal = ({login_hidden, bet_frame_hidden, header_dropdown, 
                registeration_hidden, dropdown_str}) => {
    const dispatch = useDispatch()
    const DestroyModal = e => {
        const { classList } = e.target
        if  (!e.target.closest(".modal-content") || classList.contains("active") 
            || classList.contains("active-b") || classList.contains("fa-xmark")){
            if (login_hidden) dispatch(loginFrameHiddenStart(false))
            if (header_dropdown.length) dispatch(headerDropDownStart({hidden: false}))
            if (registeration_hidden) dispatch(registerFrameHiddenStart(false))
            if (bet_frame_hidden) dispatch(betFrameHidden({boolean:false, actionStr:""}))
        }
    }

    useEffect(() => {
        const moreBtn = document.querySelector('.h-item__nav-item:last-child')
        var accBtn = document.querySelector('.h-item__acc-item.acct-btn')
        const loginBtn = document.querySelector('.h-item__acc-item.LOGIN')
        const registerBtn = document.querySelector('.h-item__acc-item.REGISTER')
        const modal = document.querySelector('.modal-content')
        const icon = document.querySelector('.modal').querySelector('.fa-caret-up')
        if (login_hidden) {
            // const { left, width } =  loginBtn.getBoundingClientRect()
            // const halfWidth = width / 2
            // const ModalPosition = left - halfWidth
            // modal.style.left = `${ModalPosition}px`
            icon.style.marginRight = "20%"//"15px"
            icon.style.marginLeft = "auto"
            modal.style.left = "auto"
            modal.style.right = "3%"

        }
        if (header_dropdown.length) {
            if (dropdown_str === "header-links"){
                const { left, right, width } =  moreBtn.getBoundingClientRect()
                const halfWidth = width / 2
                const ModalPosition = left - (halfWidth - 40)
                modal.style.left = `${ModalPosition}px`
                modal.style.right = "auto"
                icon.style.marginRight = "auto"
                icon.style.marginLeft = "auto"
                
            }
            if (dropdown_str === "Account"){
                const innerwidth = window.innerWidth
                if (innerwidth <= 768){
                    accBtn = document.querySelector('.h-item__acc.account2')
                }
                const { left, right, width } =  accBtn.getBoundingClientRect()
                const halfWidth = width / 2
                const ModalPosition = left - (width-halfWidth)
                modal.style.left = `${ModalPosition}px`
                modal.style.right = "auto"
                icon.style.marginRight = "auto"
                icon.style.marginLeft = "auto"
            }
        }
        if (registeration_hidden) {
            // const { left, width } =  registerBtn.getBoundingClientRect()
            // const halfWidth = width / 2
            // const ModalPosition = left - halfWidth
            // modal.style.left = `${ModalPosition}px`
            icon.style.marginLeft = "auto" //"90px"
            icon.style.marginRight = "auto"
            modal.style.left = "auto"
            modal.style.right = "5%"
        }
    })
    return (
        <div 
            className={`modal ${
                login_hidden || header_dropdown.length || registeration_hidden
                ? 'active' 
                : bet_frame_hidden
                ? 'active-b'
                : null
            }`}
            onMouseOver={e => DestroyModal(e)}>
            <div className='modal-content'>
                <div className='modal-item'>
                    {
                        bet_frame_hidden
                        ? <FontAwesomeIcon onMouseEnter={e => DestroyModal(e)} icon={faTimes} />
                        : <FontAwesomeIcon icon={faCaretUp} />
                    }
                    {
                    registeration_hidden ? <Register /> : null
                    }
                    {
                    login_hidden ? <Login /> : null
                    }
                    {
                    header_dropdown.length
                    ? <DropDown list={header_dropdown} /> 
                    : null
                    }
                    {
                    bet_frame_hidden ? <BookingCode bet_frame_hidden={bet_frame_hidden} /> : null
                    }
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = createStructuredSelector({
    bet_frame_hidden: selectBetFrameHidden,
    registeration_hidden: selectRegisterationHidden,
    login_hidden: selectLoginHidden,
    header_dropdown: selectHeaderDropDown,
    dropdown_str: selectHeaderDropdownActiveStr,
  })
export default connect(mapStateToProps)(Modal);


