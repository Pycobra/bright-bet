import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./register.styles.css";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import { useState } from "react";
import { registerFrameHiddenStart, loginFrameHiddenStart } from "../../redux/user/user.action";
import SiteLogo from "../site-logo/site-logo.component";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { connect, useDispatch, useSelector } from "react-redux";
import { signUpStart } from "../../redux/user/user.action"
import { createStructuredSelector} from "reselect"; 
import { useNavigate, useLocation } from "react-router-dom";
import WithButtonSpinner from "../with-button-spinner/with-button-spinner.component";
import { selectIsFetchingUser, selectErrorMsg } from "../../redux/user/user.selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faSignIn, faTimes } from "@fortawesome/free-solid-svg-icons"








const Register = ({currentUser, isFetching}) => {
    const [userCredential, setUserCredential] = useState(
        {password:'', email:'', password2:''}
    )
    const navigate = useNavigate()
    const errorMsg = useSelector(selectErrorMsg)
    const [alarmTrigger, setAlarmTrigger] = useState({trigger:false, passwordValid:false})
    const [clickedBtn, setClickedBtn] = useState(false)
    const {trigger, passwordValid} = alarmTrigger
    const {password, email, password2} = userCredential
    const dispatch = useDispatch()
    const location = useLocation()
    
    const HandleChange = (e) => {
        const {name, value} = e.target;
        setUserCredential({...userCredential, [name]: value})
        const warning = document.querySelectorAll('.field > .warning')
        Array.from(warning).map(i => i.remove())

        if (name==="password" && value.length > 0){
            const field = document.querySelector('.register').querySelector('.field:nth-child(2)')            
            const number = /\d/.test(value)
            const testAndNum = /^[A-Za-z0-9]*$/.test(value)
            if (!number){
                field.insertAdjacentHTML('afterbegin', '<div class="warning">\
                password must include numbers</div>')
                setAlarmTrigger({...alarmTrigger, trigger:true, passwordValid:false})
            }
            else if (testAndNum){
                field.insertAdjacentHTML('afterbegin', '<div class="warning">\
                password must include characters</div>')
                setAlarmTrigger({...alarmTrigger, trigger:true, passwordValid:false})
            }
            else if (value.length < 8){
                field.insertAdjacentHTML('afterbegin', '<div class="warning">\
                minimum length of password is eight</div>')
                setAlarmTrigger({...alarmTrigger, trigger:true, passwordValid:false})
            } else {
                setAlarmTrigger({...alarmTrigger, trigger:false, passwordValid:true})
            }
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setClickedBtn(true)

        const warning = document.querySelectorAll('.warning')
        Array.from(warning).map(i => i.remove())
        if (!trigger){
            dispatch(signUpStart({email, password, str:'registeration'}))
        }
    }
    const HandleLogin = e => {
        dispatch(loginFrameHiddenStart(true))
    }

    useEffect(() => {
        if (errorMsg){
            if (errorMsg.split(' ').slice(-1)=='(auth/email-already-in-use).'){
                const field = document.querySelector('.field:nth-child(1)')
                field.insertAdjacentHTML('afterbegin', `<div class="warning">
                This Email is already in use </div>`)
                setAlarmTrigger({...alarmTrigger, trigger:true})
            } 
            else if (errorMsg.split(' ').slice(-1)[0]==='(auth/network-request-failed).'){
                alert("There is a network timeout issue")
            }
            else {
                setAlarmTrigger({...alarmTrigger, trigger:false})
            }
        }

        if ((password !== password2) && password2.length > 0) {

            const fieldd = document.querySelector('.field:nth-child(3)')
            fieldd.insertAdjacentHTML('afterbegin', '<div class="warning">\
            both password do not match</div>')
            setAlarmTrigger({...alarmTrigger, trigger:true})
        } else if ((password === password2) && password2.length > 0){
            setAlarmTrigger({...alarmTrigger, trigger:false})
        }
    }, [password, password2, errorMsg, clickedBtn])


    return(
        <div id="register" className="register">
            <div className="register-content">
                <h1 className="head">Create account</h1>
                <form onSubmit={handleSubmit} className="">
                        <div className="register-item">
                            {/* <div className="input-wrap">
                                <div>
                                    <span className="country-holder">
                                        <img src="https://flagcdn.com/16x12/ng.png" alt="Nigeria"/>
                                    </span>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                    <span>+234</span>
                                </div>
                                <FormInput 
                                    inputtype="roundbordertype phone"
                                    name="phone" 
                                    type='mobile' 
                                    placeholder="Phone No*"
                                    value={phone}
                                    handleChange={(e) => HandleChange(e)}
                                    required  /> 
                            </div> */}
                            <div className="field">
                                <FormInput 
                                    inputtype="roundbordertype register"
                                name="email" 
                                type='email' 
                                placeholder='e.g brightsport@gmail.com'
                                value={email}
                                handleChange={(e) => HandleChange(e)}
                                required  /> 
                            </div>
                            <div className="field">
                                <FormInput 
                                    inputtype="roundbordertype register"
                                    name="password" 
                                    type='password' 
                                    placeholder="Password*"
                                    value={password}
                                    handleChange={(e) => HandleChange(e)}
                                    required  /> 
                            </div>
                            <div className="field">
                                <FormInput 
                                    disabled={passwordValid && (email.length!==0 && password.length!==0) 
                                        ? false : true }
                                    inputtype="roundbordertype register"    
                                    name="password2" 
                                    type='password' 
                                    placeholder="Password2*"
                                    value={password2}
                                    handleChange={(e) => HandleChange(e)}
                                    required  /> 
                            </div>
                        </div> 
                        <div className="register-item">
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
                            <span>Login</span>
                            </CustomButton> 
                        </div>
                        <div className="register-item">
                            <span className="box1">Do you have an account -</span>
                            <div className="box2" onClick={e => HandleLogin(e)}><span>sign in</span><FontAwesomeIcon style={{fontSize:'15px'}} icon={faSignIn}/></div>
                        </div>
                        {/* <div className="register-item">
                            <span className="box1">Create your account via google</span>
                            <span className="box2"><FontAwesomeIcon style={{fontSize:'15px'}} icon={faBars}/></span>
                        </div> */}
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    isFetching: selectIsFetchingUser
})

const mapDispatchToProps = dispatch => ({
    signUpStart: (emailAndPassword) => dispatch(signUpStart(emailAndPassword)),
    registerFrameHiddenStart: () => dispatch(registerFrameHiddenStart())
})
export default connect(mapStateToProps, mapDispatchToProps)(Register);