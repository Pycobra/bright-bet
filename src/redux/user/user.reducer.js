import UserActionTypes from "./user.types"



const StringsForHeaderLinks = ["LIVE", 'CASINO', "JACKPOT", 'FIREBET', 'BONUSES']
const StringsForAccountList = ['DEPOSIT & WITHDRAW',  'ACCOUNT SETTING', "BET HISTORY", "TRANSACTIONS", 'LOGOUT']

const INITIAL_STATE = {
    currentUser: null,
    errorMessage: null,
    successMessage: null,
    registeration_hidden: false,
    transaction: null,
    checkout: null,
    stringsForAccountList: StringsForAccountList,
    stringsForHeaderLinks: StringsForHeaderLinks,
    header_dropdown: [],
    headerDropdownActiveStr: null,
    login_hidden: false,
    isFetching: false,
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {       
        case UserActionTypes.REGISTERATION_HIDDEN_START:
            return{
                ...state,
                header_dropdown: false,
                errorMessage: null,
                successMessage: null,
                headerDropdownActiveStr: null,
                login_hidden: false,
                registeration_hidden: action.payload===false
                        ? false : action.payload===true 
                        ? true : state.registeration_hidden
            }     
        case UserActionTypes.LOGIN_HIDDEN_START:
            return{
                ...state,
                header_dropdown: false,
                errorMessage: null,
                successMessage: null,
                headerDropdownActiveStr: null,
                registeration_hidden: false,
                login_hidden: action.payload===false
                        ? false : action.payload===true 
                        ? true : state.login_hidden
            }   
        case UserActionTypes.HEADER_DROPDOWN_START:
            return{
                ...state,
                registeration_hidden: false,
                login_hidden: false, 
                errorMessage: null,
                successMessage: null,
                headerDropdownActiveStr: action.payload.str,
                header_dropdown: action.payload.hidden===true
                        ? (
                            action.payload.str === "header-links"
                            ? state.stringsForHeaderLinks
                            : action.payload.str === "Account" 
                            ? state.stringsForAccountList
                            : null
                        )
                        : []
            }
        case UserActionTypes.HANDLE_USER_PIN_START:
        case UserActionTypes.CHANGE_USER_PASSWORD_START:
            return{
                ...state,
                errorMessage: null,
                isFetching: true,
            }
        case UserActionTypes.CHANGE_USER_PASSWORD_SUCCESS:
            return{
                ...state,
                errorMessage: null,
                isFetching: false,
                successMessage: action.payload
            }  
        case UserActionTypes.HANDLE_USER_PIN_SUCCESS:
            return{
                ...state,
                errorMessage: null,
                isFetching: false,
                successMessage: action.payload.payload2,
                currentUser: action.payload.payload1
            } 
        case UserActionTypes.SET_CURRENT_USER:
        case UserActionTypes.UPDATE_USER_INFO:
        case UserActionTypes.POST_ACCOUNT_ACTIVATION_SUCCESS:
            return{
                ...state,
                errorMessage: null,
                isFetching: false,
                currentUser: action.payload
            }            
        case UserActionTypes.FETCH_ALL_USERS_START:
            return{
                errorMessage: null,
                successMessage: null,
                isFetching: true,
                ...state,
            }
        case UserActionTypes.FETCH_ALL_USERS_SUCCESS:
            return{
                ...state,
                errorMessage: null,
                isFetching: false,
                errorMessage: null
            }
        case UserActionTypes.FETCH_ALL_USERS_FAILURE:
            return{
                ...state,
                successMessage: null,
                isFetching: false,
                errorMessage: action.payload
            }    
                           
        case UserActionTypes.FETCH_ALL_CHECKOUT_START:
        case UserActionTypes.FETCH_ALL_TRANSACTION_START:
            return{
                errorMessage: null,
                successMessage: null,
                isFetching: true,
                ...state,
            }
        case UserActionTypes.FETCH_ALL_CHECKOUT_SUCCESS:
            return{
                ...state,
                errorMessage: null,
                successMessage: null,
                isFetching: false,
                checkout: action.payload
            }
        case UserActionTypes.FETCH_ALL_TRANSACTION_SUCCESS:
            return{
                ...state,
                errorMessage: null,
                successMessage: null,
                isFetching: false,
                transaction: action.payload
            }
        case UserActionTypes.FETCH_ALL_CHECKOUT_FAILURE:
        case UserActionTypes.FETCH_ALL_TRANSACTION_FAILURE:
            return{
                ...state,
                successMessage: null,
                isFetching: false,
                errorMessage: action.payload
            }



        case UserActionTypes.SIGN_UP_START:
        case UserActionTypes.SIGN_IN_START:
        case UserActionTypes.SIGN_OUT_START:
            return{
                ...state,
                errorMessage: null,
                successMessage: null,
                isFetching: true
            }            
        case UserActionTypes.SIGN_IN_SUCCESS:
            return{
                ...state,
                currentUser: action.payload,
                errorMessage: null,
                successMessage: null,
                isFetching: false,
                userAmount: action.payload.amount,
            }
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return{
                ...state,
                currentUser: null,
                errorMessage: null,
                successMessage: null,
                isFetching: false,
            }
        case UserActionTypes.SIGN_UP_FAILURE:
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.CHANGE_USER_PASSWORD_FAILURE:
        case UserActionTypes.HANDLE_USER_PIN_FAILURE:
        case UserActionTypes.DEACTIVATE_ACCOUNT_FAILURE:
        case UserActionTypes.POST_ACCOUNT_ACTIVATION_FAILURE:
            return{
                ...state,
                isFetching: false,
                errorMessage: action.payload,
                successMessage: null,
            }
        
        default:
            return state
    }
}
 
export default userReducer;