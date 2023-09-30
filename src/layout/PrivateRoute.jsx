import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useAuthStore } from '../store/auth';
import { selectCurrentUser } from '../redux/user/user.selector';
// import { useSelector } from 'react-redux';
import { createStructuredSelector} from "reselect"; 
import { connect, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loginFrameHiddenStart } from '../redux/user/user.action';







const PrivateRoute = ({ children, currentUser }) => {
    const dispatch = useDispatch()
    // useEffect(() => {
    //     if (currentUser) dispatch(loginFrameHiddenStart())
    // })
    return(currentUser ? children : <Navigate to="/" />);
    // return (
    //     <Route path='/:userID/my_accounts/*'
    //         element={currentUser ? children : <Navigate to="/" />}  /> 
    // ) 
};
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})
export default connect(mapStateToProps)(PrivateRoute);