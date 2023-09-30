import { createSelector } from "reselect";

const selectUser = state => state.user

export const selectCurrentUser = createSelector(
    [selectUser],
    (user) => user.currentUser
)

export const selectUserData = createSelector(
    [selectUser],
    (user) => user.userData
)
export const selectRegisterationHidden= createSelector(
    [selectUser],
    (user) => user.registeration_hidden
)
export const selectLoginHidden = createSelector(
    [selectUser],
    (user) => user.login_hidden
)
export const selectHeaderDropDown = createSelector(
    [selectUser],
    (user) => user.header_dropdown
)
export const selectStringsForHeaderLinks = createSelector(
    [selectUser],
    (user) => user.stringsForHeaderLinks
)
export const selectHeaderDropdownActiveStr = createSelector(
    [selectUser],
    (user) => user.headerDropdownActiveStr
)

export const selectErrorMsg = createSelector(
    [selectUser],
    (user) => user.errorMessage
)
export const selectSuccessMsg = createSelector(
    [selectUser],
    (user) => user.successMessage
)
export const selectIsFetchingUser = createSelector(
    [selectUser],
    (user) => user.isFetching
)
