import UserActionTypes from "./user.types"


export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
})
export const fetchAllUsersStart = () => ({
    type: UserActionTypes.FETCH_ALL_USERS_START
})
export const fetchAllUsersSuccess = (data) => ({
    type: UserActionTypes.FETCH_ALL_USERS_SUCCESS,
    payload: data
})
export const fetchAllUsersFailure = errorMessage => ({
    type: UserActionTypes.FETCH_ALL_USERS_FAILURE,
    payload: errorMessage
})
export const registerFrameHiddenStart = (bool) => ({
    type: UserActionTypes.REGISTERATION_HIDDEN_START,
    payload: bool
})
export const loginFrameHiddenStart = (bool) => ({
    type: UserActionTypes.LOGIN_HIDDEN_START,
    payload: bool
})
export const headerDropDownStart = (obj) => ({
    type: UserActionTypes.HEADER_DROPDOWN_START,
    payload: obj
})
export const changeUserPasswordStart = (password) => ({
    type: UserActionTypes.CHANGE_USER_PASSWORD_START,
    payload: password
})
export const changeUserPasswordSuccess = (password) => ({
    type: UserActionTypes.CHANGE_USER_PASSWORD_SUCCESS,
    payload: password
})
export const changeUserPasswordFailure = (error) => ({
    type: UserActionTypes.CHANGE_USER_PASSWORD_FAILURE,
    payload: error
})
export const accountActivationStart = (bool) => ({
    type: UserActionTypes.POST_ACCOUNT_ACTIVATION_START,
    payload: bool
})
export const accountActivationSuccess = (obj) => ({
    type: UserActionTypes.POST_ACCOUNT_ACTIVATION_SUCCESS,
    payload: obj
})
export const accountActivationFailure = (error) => ({
    type: UserActionTypes.POST_ACCOUNT_ACTIVATION_FAILURE,
    payload: error
})
export const handleUserPinStart = (pin) => ({
    type: UserActionTypes.HANDLE_USER_PIN_START,
    payload: pin
})
export const handleUserPinSuccess = (pin) => ({
    type: UserActionTypes.HANDLE_USER_PIN_SUCCESS,
    payload: pin
})
export const handleUserPinFailure = (error) => ({
    type: UserActionTypes.HANDLE_USER_PIN_FAILURE,
    payload: error
})

export const updateUSerInfo = (obj) => ({
    type: UserActionTypes.UPDATE_USER_INFO,
    payload: obj
})
export const signInStart = userCredential => {
    console.log(userCredential)
    return ({
    type: UserActionTypes.SIGN_IN_START,
    payload: userCredential
})}
export const signInSuccess = user => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
})
export const signInFailure = errorMessage => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: errorMessage
}) 
export const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START
})
export const signOutFailure = errorMessage => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: errorMessage
})
export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS
}) 
export const signUpStart = signupCredential => ({
    type: UserActionTypes.SIGN_UP_START,
    payload: signupCredential
})
export const signUpFailure = errorMessage => ({
    type: UserActionTypes.SIGN_UP_FAILURE,
    payload: errorMessage
})
export const signUpSuccess = (credential) => ({
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: credential
})
export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION
})

