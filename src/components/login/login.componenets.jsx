import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./login.styles.css";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import { useState } from "react";
import { loginFrameHiddenStart, registerFrameHiddenStart } from "../../redux/user/user.action";
import SiteLogo from "../site-logo/site-logo.component";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import { connect, useDispatch, useSelector } from "react-redux";
import { signInStart, emailSignInStartRealm } from "../../redux/user/user.action"
import { createStructuredSelector} from "reselect"; 
import { useNavigate, useLocation } from "react-router-dom";
import WithButtonSpinner from "../with-button-spinner/with-button-spinner.component";
import { selectIsFetchingUser, selectErrorMsg } from "../../redux/user/user.selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faSignIn, faTimes } from "@fortawesome/free-solid-svg-icons"








const Login = ({currentUser, isFetching}) => {
    const [userCredential, setUserCredential] = useState({email: '', password: '', phone: ''})
    const {email, phone, password} = userCredential
    
    const error_msg = useSelector(selectErrorMsg)
    const [errorMsg, setErrorMsg] = useState({})
    
    const HandleChange = (e) => {
        const {name, value} = e.target;
        setUserCredential({...userCredential, [name]: value})
        setErrorMsg({})
    }
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!errorMsg.msg){
            dispatch(signInStart(userCredential))
        }
        
        // if (currentUser) {
        //     const redirectTo = location.search.replace("?redirectTo=", "");
        //     navigate(redirectTo ? redirectTo : "/");
        // } else {
        //     dispatch(signInStart(userCredential))

        // }
    }
    useEffect(() => {
        if (error_msg){
            if (error_msg.split(' ').slice(-1)[0]==='(auth/wrong-password).'){
                setErrorMsg({msg: "The password is invalid", name: "password"})
            }
            else if (error_msg.split(' ').slice(-1)[0]==='(auth/user-not-found).'){
                setErrorMsg({msg: "This user does not exist", name: "email"})
            }
            else if (error_msg.split(' ').slice(-1)[0]==='(auth/network-request-failed).'){
                alert("There is a network timeout issue")
            }
        }
    }, [error_msg])
    

    const HandleLogin = e => {
        dispatch(registerFrameHiddenStart(true))
    }
    return(
        <div id="login" className="login">
            <div className="login-content">
                <h1 className="head">Sign in</h1>
                <form onSubmit={handleSubmit} className="">
                        <div className="login-item">
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
                                {
                                    errorMsg.name==="email" ? <span className="warning">{errorMsg.msg}</span> : null
                                }
                                <FormInput 
                                    inputtype="roundbordertype register"
                                    name="email" 
                                    type='email' 
                                    placeholder="email*"
                                    value={email}
                                    handleChange={(e) => HandleChange(e)}
                                    required  /> 
                            </div>
                            <div className="field">
                                {
                                    errorMsg.name==="password" ? <span className="warning">{errorMsg.msg}</span> : null
                                }
                                <FormInput 
                                    inputtype="roundbordertype register"
                                    name="password" 
                                    type='password' 
                                    placeholder="Password*"
                                    value={password}
                                    handleChange={(e) => HandleChange(e)}
                                    required  /> 
                            </div>
                        </div> 
                        <div className="login-item">
                            <div className="one"><input type="checkbutton"/><span>Remember</span></div>
                            <Link to="/"><span>Forgotten password{'?'}</span></Link>
                        </div>
                        <div className="login-item">
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
                        <div className="login-item">
                            <span className="box1">You dont have an account -</span>
                            <div className="box2" onClick={e => HandleLogin(e)}><span>sign up</span><FontAwesomeIcon style={{fontSize:'15px'}} icon={faSignIn}/></div>
                        </div>
                        {/* <div className="login-item">
                            <span className="box1">You can log into website via google</span>
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
    signInStart: (emailAndPassword) => dispatch(signInStart(emailAndPassword)),
    loginFrameHiddenStart: (bool) => dispatch(loginFrameHiddenStart(bool))
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);