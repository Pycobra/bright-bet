import { takeLatest, all, call, put } from "redux-saga/effects"
import UserActionTypes from "./user.types"
import { 
    googleProvider,
    auth,
    createOrFetchUserProfileDocument,
    getCurrentUser,
    adjustUserAccount,
    updateOfNewPassword,
} from "../../firebase/firebase.utils"
// import { 
//     emailPasswordLogin, emailPasswordSignup, 
//     fetchUser, logOutUser 
// } from "../../mongodb/mongodb.utils"
import {  
    signInFailure, 
    signInSuccess,
    signOutFailure, 
    signOutSuccess,
    signUpFailure, 
    signUpSuccess,
    fetchAllUsersSuccess, 
    fetchAllUsersFailure,
    loginFrameHiddenStart,
    registerFrameHiddenStart,
    changeUserPasswordSuccess,
    changeUserPasswordFailure,
    handleUserPinSuccess,
    handleUserPinFailure,
    accountActivationSuccess,
    accountActivationFailure,
} from "./user.action"
import { selectErrorMsg } from "./user.selector"





class CustomError extends Error{
    constructor(msg){
        super();
        this.name = "";
        this.message= msg;
    }
}






export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    // only signup has additionalData, for google signin & email signin, 
    // additionalData wasnt provided so js will see it as undefined
    try{
        const userRef = yield call(createOrFetchUserProfileDocument, userAuth, additionalData)
        const userSnapShot = yield userRef.get()
        yield put(signInSuccess({id: userSnapShot.id, ...userSnapShot.data()}))
        yield put(loginFrameHiddenStart(false))
    } catch (error){
       yield put(signInFailure(error.message))
    }
}

export function* getAllUsers(){
    try{
        yield put(fetchAllUsersSuccess())
    } 
    catch (error){
        yield put(fetchAllUsersFailure(error.message))
    }
}

export function* postHandleAccountActivation({payload}) {
    try{
        const userAuth =  yield getCurrentUser();
        const userRef = yield call(adjustUserAccount, userAuth, payload, "activation");
        const userSnapShot = yield userRef.get()
        yield put(accountActivationSuccess(userSnapShot.data()))
    } catch (error){
       yield put(accountActivationFailure(error.message))
    }
}
export function* postHandleUserPin({payload}) {
    const {newPin, text} = payload
    try{
        const userAuth =  yield getCurrentUser();
        const userRef = yield call(adjustUserAccount, userAuth, newPin, "pin");
        const userSnapShot = yield userRef.get()
        var msg = `${text.split(" ")[0] + "d " + text.split(" ")[1] + " " + text.split(" ")[2]}` 
        yield put(handleUserPinSuccess({payload1: userSnapShot.data(), 
            payload2: {name:"pin", "msg": `You ${msg} successfully`}}))
    } catch (error){
       yield put(handleUserPinFailure(error.message))
    }
}
export function* postChangeUserPassword({payload}) {
    try{
        const userAuth =  yield getCurrentUser();
        const email = userAuth.email
        const password = payload.oldPassword
        const { user } =  yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user)
        yield call(updateOfNewPassword, payload.newPassword);
        yield put(changeUserPasswordSuccess({name:"password", msg: "password changed successfully"}))
    } catch (error){
       yield put(changeUserPasswordFailure(error.message))
    }
}



export function* SignUp({payload: {displayName, email, password, str}}) {
    try{
        const {user} = yield auth.createUserWithEmailAndPassword(email, password);
        // yield createUserProfileDocument(user)
        const credentialLoad = {"user": user}
        yield put(signUpSuccess(credentialLoad)) 
    } catch (error){
        if (str==='registeration' || str==='RUN_CHECK'){
            yield put(signUpFailure(error.message))
        } else {
            yield put(signInFailure(error.message))
        }
    }
}
export function* SignInAfterSignUp({payload:{user, additionalData}}) {
    yield getSnapshotFromUserAuth(user, additionalData)
    yield put(registerFrameHiddenStart(false))
}

export function* SignOut() {
    try{
        yield auth.signOut();
        yield put(signOutSuccess())
    } catch (error){
       yield put(signOutFailure(error.message))
    }
}


export function* SignIn({payload: {email, password}}) {
    // we use try cause every api call has the probability of failing
    try{
        const { user } =  yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user)
    } catch (error){
       yield put(signInFailure(error.message))
    }
}

export function* isUserAuthenticated() {
    try{
        const userAuth =  yield getCurrentUser();
        yield getSnapshotFromUserAuth(userAuth)
    } catch (error){
       yield put(signInFailure(error.message))
    }
}





export function* onFetchAllUsersStart() {
    yield takeLatest(UserActionTypes.FETCH_ALL_USERS_START, 
        getAllUsers)
}
export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, 
        isUserAuthenticated)
}
export function* onSignInStart() {
    yield takeLatest(UserActionTypes.SIGN_IN_START, 
        SignIn)
}


export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, 
        SignOut)
}
export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, 
        SignUp)
}
export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, 
        SignInAfterSignUp)
}
export function* onChangeUserPasswordStart() {
    yield takeLatest(UserActionTypes.CHANGE_USER_PASSWORD_START, 
        postChangeUserPassword)
}
export function* postHandleAccountActivationStart() {
    yield takeLatest(UserActionTypes.POST_ACCOUNT_ACTIVATION_START, 
        postHandleAccountActivation)
}
export function* onHandleUserPinStart() {
    yield takeLatest(UserActionTypes.HANDLE_USER_PIN_START, 
        postHandleUserPin)
}
export function* userSagas() {
    yield all([
        call(onCheckUserSession), 
        call(onSignInStart), 
        call(onCheckUserSession), 
        call(onSignOutStart), 
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onFetchAllUsersStart),
        call(onFetchAllUsersStart),
        call(onChangeUserPasswordStart),
        call(onHandleUserPinStart),
        call(postHandleAccountActivationStart),
    ])
}

