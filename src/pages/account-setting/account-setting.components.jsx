import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./account-setting.styles.css";
import { createStructuredSelector} from "reselect"; 
import { connect, useDispatch } from 'react-redux';
import { selectCurrentUser, selectIsFetchingUser, selectErrorMsg, selectSuccessMsg } from "../../redux/user/user.selector";
import WithButtonSpinner from "../../components/with-button-spinner/with-button-spinner.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBank, faCaretDown, faCaretUp, faInfoCircle, faTools } from "@fortawesome/free-solid-svg-icons";
import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import { 
    changeUserPasswordStart, 
    accountActivationStart, 
    handleUserPinStart, 
    checkUserSession,
    signInStart,
} from "../../redux/user/user.action";
import { selectErrorMsg as userError } from "../../redux/user/user.selector";





const AccountSetting = ({currentUser, error_msg, user_error_msg, success_msg, transaction_bet_details, payment_options, isFetching}) => {

    const [dataPassword, setDataPassword] = useState(
        {oldPasswordError: "", oldPassword: "", newPassword: "", newPasswordError:""}
    )
    const {oldPasswordError, oldPassword, newPassword, newPasswordError} = dataPassword
    
    const [dataPin, setDataPin] = useState({
        currentUserPin: "",  oldPin: "", oldPinError: "", pinError: "", newPin: ""
    })
    const {currentUserPin, pinError, oldPinError, oldPin, newPin} = dataPin
    const [alarmTrigger, setAlarmTrigger] = useState()
    const HandleChange = (e) => {
        const {name, value} = e.target;
        if (Object.keys(dataPassword).find(i => i === name)) {
            setDataPassword({...dataPassword, newPasswordError:"", oldPasswordError:"", [name]:value})
        }
        if (Object.keys(dataPin).find(i => i === name)) {
            setDataPin({...dataPin, pinError: "", oldPinError: "", [name]:value})
        }
        
        if (name==="newPassword" && value.length){
            const number = /\d/.test(value)
            const testAndNum = /^[A-Za-z0-9]*$/.test(value)
            if (!number){
                setDataPassword({...dataPassword, [name]:value, newPasswordError:" password must include numbers"})
                setAlarmTrigger(true)
            }
            else if (testAndNum){
                setDataPassword({...dataPassword, [name]:value, newPasswordError:"password must include characters"})
                setAlarmTrigger(true)
            }
            else if (value.length < 8){
                setDataPassword({...dataPassword, [name]:value, newPasswordError:"minimum length of password is eight"})
                setAlarmTrigger(true)
            } else {
                setAlarmTrigger(false)
            }
        }
    }
    const [dropDown, setDropDown] = useState([false, false])
    const HandleClick = (e, num) => {
        const drop = dropDown.map((bool, ind) => 
            num===ind ? !bool : false
        )
        setDropDown(drop)
    }
    const dispatch = useDispatch()
    const HandleSubmit = (e) => {
        e.preventDefault()
        var elem = e.target.parentElement.querySelector(".head > h2")
        if (!elem){
            var elem = e.target
        }
        const text = elem.textContent
        if (text==="Change Password" && !alarmTrigger){
            dispatch(changeUserPasswordStart({newPassword, oldPassword}))
        }
        else if (text==="Create a pin"){
            if (newPin.length === 4) {
                dispatch(handleUserPinStart({newPin, text}))
            } else {
                setDataPin({...dataPin, pinError: "pin must be 4 digits"})
            }
        }
        else if (text==="Change your pin"){
            if (oldPin !== currentUserPin) {
                setDataPin({...dataPin, oldPinError: "incorrect pin"})
            }
            else if (newPin.length !== 4) {
                setDataPin({...dataPin, pinError: "pin must be 4 digits"})
            } else {
                dispatch(handleUserPinStart({newPin, text}))
            }
        }
        else if (text==="Deactivate Account"){
            dispatch(accountActivationStart(false))
        }
        else if (text==="Reactivate Account"){
            dispatch(accountActivationStart(true))
        }
        
    }
    useEffect(() => {
        if (error_msg) {
            if ((error_msg.split(' ').slice(-1)[0]==='(auth/wrong-password).' ||
                error_msg.split(' ').slice(-1)[0]==="(reading 'get')")){
                setDataPassword({...dataPassword, oldPasswordError: "incorrect password"})
            } else if (error_msg.split(' ').slice(-1)[0]==='(auth/network-request-failed).' ||
                error_msg==='Failed to get document because the client is offline.'){
                alert("Failed to get document because the client is offline.")
            } else if (user_error_msg.split(' ').slice(-1)[0]==='(auth/network-request-failed).' ||
                user_error_msg==='Failed to get document because the client is offline.'){
                alert("Failed to get document because the client is offline.")
        }
        }
    },[error_msg])
    
    useEffect(() => {
        if (currentUser)
            setDataPin({...dataPin, currentUserPin: currentUser.pin})
    },[currentUser])
    useEffect(() => {
        dispatch(checkUserSession())
    },[])
    
    return (
            <div className="account-setting">
                {
                    success_msg
                    ? (success_msg.name==="password" || success_msg.name==="pin"
                        ? <span className="success">{success_msg.msg}</span> 
                        : null)
                    : null                }
                <div className="account-setting__wrap">
                    <div className="head-place"><h1>ACCOUNT SETTING</h1> <FontAwesomeIcon icon={faTools} /></div>
                    <div className="account-s__wrap-body">
                        <div className="account-s__wrap-col">
                            <div className="account-s__wrap-item">
                                <div className="head" onClick={e => HandleClick(e, 0)}>
                                    <h2>Change Password</h2>
                                    <FontAwesomeIcon icon={dropDown[0] ? faCaretUp : faCaretDown} />
                                </div>
                                {
                                    dropDown[0]
                                    ?<form onSubmit={HandleSubmit}>
                                            <div className="field">
                                                {
                                                    oldPasswordError 
                                                    ? <span className="msg">{oldPasswordError}</span>
                                                    : null
                                                }
                                                <FormInput 
                                                    inputtype="roundbordertype register"
                                                    name="oldPassword" 
                                                    type='text' 
                                                    placeholder="enter former password*"
                                                    value={oldPassword}
                                                    handleChange={(e) => HandleChange(e)}
                                                    required  /> 
                                            </div>
                                            <div className="field">
                                                {
                                                    newPasswordError 
                                                    ? <span className="msg">{newPasswordError}</span>
                                                    : null
                                                }
                                            <FormInput 
                                                inputtype="roundbordertype register"
                                                name="newPassword" 
                                                type='text' 
                                                placeholder="enter new password*"
                                                value={newPassword}
                                                handleChange={(e) => HandleChange(e)}
                                                required  /> 
                                            </div>
                                            <CustomButton buttonType="MajorButton register">
                                                {
                                                    isFetching
                                                    ? <WithButtonSpinner
                                                        elemStr="miniscreen" 
                                                        widthAndHeight="17"  
                                                        borderColor="3px solid var(--default)" 
                                                        topBorderColor="var(--green2)"/>
                                                    : null
                                                }
                                                Submit
                                            </CustomButton>
                                    </form>
                                    : null
                                }
                            </div>
                            <div className="account-s__wrap-item">
                                <div className="head" onClick={e => HandleClick(e, 1)}>
                                    {
                                        currentUserPin
                                        ? <h2>Change your pin</h2>
                                        : <h2>Create a pin</h2>
                                    }
                                    <FontAwesomeIcon icon={dropDown[1] ? faCaretUp : faCaretDown} />
                                </div>
                                {
                                    dropDown[1]
                                    ?<form onSubmit={HandleSubmit}>
                                        {
                                            currentUserPin
                                            ?  <div className="field">
                                                {
                                                    oldPinError 
                                                    ? <span className="msg">{oldPinError}</span>
                                                    : null
                                                }
                                                <FormInput 
                                                    inputtype="roundbordertype register"
                                                name="oldPin" 
                                                type='number' 
                                                placeholder="enter former pin*"
                                                value={oldPin}
                                                handleChange={(e) => HandleChange(e)}
                                                required  /> 
                                            </div>
                                            : null
                                        }
                                        <div className="field">
                                            {
                                                pinError 
                                                ? <span className="msg">{pinError}</span>
                                                : null
                                            }
                                            <FormInput 
                                                inputtype="roundbordertype register"
                                                name="newPin" 
                                                type='number' 
                                                placeholder="enter new pin*"
                                                value={newPin}
                                                handleChange={(e) => HandleChange(e)}
                                                required  /> 
                                        </div>
                                            <CustomButton buttonType="MajorButton register">
                                                {
                                                    isFetching
                                                    ? <WithButtonSpinner 
                                                        elemStr="miniscreen" 
                                                        widthAndHeight="17"  
                                                        borderColor="3px solid var(--default)" 
                                                        topBorderColor="var(--green2)"/>
                                                    : null
                                                }
                                                Submit
                                            </CustomButton>
                                    </form>
                                    :null
                                }
                            </div>
                            <div className="account-s__wrap-item">
                                <div className="head">
                                
                                {
                                    currentUser 
                                    ? (currentUser.is_active 
                                        ? <h2 onClick={e => HandleSubmit(e)}>Deactivate Account</h2> 
                                        : <h2 onClick={e => HandleSubmit(e)}>Reactivate Account</h2>) 
                                    : <h2 onClick={e => HandleSubmit(e)}>Deactivate Account</h2>
                                }
                                {/* <FontAwesomeIcon icon={faBank} /> */}
                                </div>
                            </div>
                            <div className="account-s__wrap-item">
                                <span>Change password</span>
                                {/* <FontAwesomeIcon icon={faBank} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    error_msg: selectErrorMsg,
    user_error_msg: userError,
    success_msg: selectSuccessMsg,
    isFetching: selectIsFetchingUser,
})
export default connect(mapStateToProps)(AccountSetting);


