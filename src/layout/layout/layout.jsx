import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import Header from '../../components/header/header.component.jsx';
import './layout.css'
import Login from '../../components/login/login.componenets.jsx';
import BookingCode from '../../components/booking-code/booking-code.components.jsx';
import Footer from '../../components/footer/footer.component.jsx';
import { selectBooking, selectBookingPopUpHiddenStr } from '../../redux/bet/bet.selectors.js';
import { createStructuredSelector} from "reselect"; 
import { connect, useDispatch, useSelector } from 'react-redux';
import { checkUserSession } from '../../redux/user/user.action.js';
import ErrorBoundary from '../error-boundary/error-boundary.jsx';
import Modal from '../../components/modal/modal.components.jsx';
// import Transaction from '../../pages/transaction/transaction.components.jsx';
import { selectCurrentUser } from '../../redux/user/user.selector.js';
import AccountSetting from '../../pages/account-setting/account-setting.components.jsx';
import DepositWithdrawalPage from '../../pages/deposit-withdrawal-page/deposit-withdrawal-page.components.jsx';
import WithSpinner from '../../components/with-spinner/with-spinner.component.jsx';
import Fallback from '../fallback/fallback.jsx';
import MyBetPage from '../../pages/mybetpage/mybetpage.components.jsx';
import TransactionPage from '../../pages/transactionPage/transactionPage.components.jsx';
// import { UserProvider } from "./contexts/user.context";
import MyAccount from '../../pages/my-account/my-account.components.jsx';
import { loginFrameHiddenStart } from '../../redux/user/user.action.js';
import PrivateRoute from '../PrivateRoute.jsx';


const LandingPage = lazy(() => 
  Promise.all([
    import('../../pages/landingpage/landingpage.jsx'),
    new Promise(resolve => setTimeout(resolve, 5000))
  ]) 
  .then(([moduleExport]) => moduleExport)
)

// const TransactionWithSpinner = () => WithSpinner(Transaction)






const Layout = ({currentUser}) => {
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
      // checkUserSession()
      dispatch(checkUserSession())
  }, [])
  
  // useEffect(() => {
  //     const headerHeight = document.querySelector('header').clientHeight
  //     const sportBarHeight = document.querySelector('.sport-toolbar__item')
  //     document.querySelector('main')
  //         .setAttribute('style', `margin-top:${headerHeight + (sportBarHeight ? sportBarHeight.clientHeight : 0)}px;`)
  // })

  return (
        <div className='layout'>
            <div className='main-layout'>
                <Header/>
                <div className='main-wrap-content'>
                  <main>
                    <div id='container' className='container'>
                      <ErrorBoundary>
                        <Suspense fallback={              
                          <Fallback url={`../../Media/gifs/Fidget-spinner.gif`} type="gif" text="Page Is Currently Loading..."/>
                          }>
                          <Routes>
                              <Route path='/*' element={<LandingPage />} /> 
                              <Route 
                              path='/:userID/my_accounts/*'
                              element={<PrivateRoute ><MyAccount  /></PrivateRoute>} />
                              {/* element={currentUser ? <MyAccount  /> : <Navigate to="/" replace />}  />   */}
                          </Routes>
                        </Suspense>
                      </ErrorBoundary>
                    </div>
                  </main>
                  <Footer />
                </div>
                <Modal />
            </div>
        </div>
  );
};



const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})
export default connect(mapStateToProps)(Layout);











// class Layout extends React.Component {
//   constructor(){
//     super()
//     this.state = {}
//   }

  
//   // const {pathname} = useLocation()
//   // useEffect(() => {
//   //     if (pathname==='')
//   // }, [])

//   componentDidMount(){
//     const {checkUserSession, use_location} = this.props
//     console.log(use_location)
//     checkUserSession()
//   }

//   render(){
//     const {booking_hidden_str, registeration_hidden} = this.props
//     return (
//       <div className='app'>
//         <Router>
//           <div id='wrapper' className='wrapper'>
//             <Header/>
//             <div className='main-wrap-content'>
//               <main>
//                 <div id='container' className='container'>
//                   {
//                     !registeration_hidden ? <SignUp /> : null
//                   }
//                   {
//                     booking_hidden_str ? <BookingCode booking_hidden_str={booking_hidden_str} /> : null
//                   }
//                   <Routes>
//                       <Route path='/*' element={<LandingPage />} />           
//                       <Route path='/registeration'  element={<Registration />} /> 
//                   </Routes>
//                 </div>
//               </main>
//               <Footer />
//             </div>
//           </div>
//         </Router>
//       </div>
//     );
//   };
// };
// const mapStateToProps = createStructuredSelector({
//   booking_hidden_str: selectBookingPopUpHiddenStr,
//   currentUser: selectCurrentUser,
//   registeration_hidden: selectRegisterationHidden
// })
// const mapDispatchToProps = dispatch => ({
//      checkUserSession: () => dispatch(checkUserSessionRealm()),
//      loginFrameHiddenStart: () => dispatch(loginFrameHiddenStart())
// })
// export default connect(mapStateToProps, mapDispatchToProps)(Layout);

