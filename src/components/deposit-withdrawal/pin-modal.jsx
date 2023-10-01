import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./pin-modal.styles.css";
import { createStructuredSelector} from "reselect"; 
import { connect, useDispatch } from 'react-redux';
import { usePaystackPayment, PaystackButton } from "react-paystack";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { selectCheckoutDetails, selectPaymentOptions } from "../../redux/checkout/checkout.selectors";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { PAYSTACK_PUBLIC_KEY, FLUTTERWAVE_PUBLIC_KEY } from "./constant";
import { completePaymentStart, paymentOptionsStart } from "../../redux/checkout/checkout.action";
import { selectIsFetchingCheckout } from "../../redux/checkout/checkout.selectors";







const PinModal = ({currentUser, removePinModal, paymentDetails}) => {
    const { cardType, paymentPlatform, transactionType, amount } = paymentDetails
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [config, setConfig] = useState({})
    const [pinInput, setPinInput] = useState([
        {name:"pin1", value:"", type:"number"},
        {name:"pin2", value:"", type:"number"},
        {name:"pin3", value:"", type:"number"},
        {name:"pin4", value:"", type:"number"},
    ])
    const HandleChange = (e, id) => {
        const {value, name} = e.target
        const item = document.querySelector(".pin-modal__item-row:last-child .item")
        if (item.querySelector(".msg")) item.querySelector(".msg").remove()
        
        if (pinInput[id].value===""){
            var newPinInput = pinInput.map((i, ind) => {
                if (ind===id) {
                    i.value=value
                    return i
                }
                else if (ind!==id && i.value) {
                    i.type="password"
                    return i
                }
                i.type="number"
                return i
            })
            setPinInput(newPinInput)
        } else {
            var newPinInput = pinInput.map((i, ind) => {
                if (ind===id) {
                    i.value=""
                    return i
                }
                return i
            })
            setPinInput(newPinInput)
        }
        const emptyInput = pinInput.find(i => i.value==="")
        if (!emptyInput){
            const allValues = pinInput.map(i => i.value).join('')
            HandlePaymentSubmit(allValues)
        }
        
    }
    const initializePaystackPayment = usePaystackPayment(config);
    const initializeFlutterPayment = useFlutterwave(config);
    const onSuccess = (response) => {
        if (response){
            if (paymentPlatform==="Flutterwave") {
                dispatch(completePaymentStart({paymentDetails, ref: response.transaction_id}))
                closePaymentModal()
                return
            }
            dispatch(completePaymentStart({paymentDetails, ref: response.reference}))
        }
        else alert("Something is wrong, Payment returned no response")

    }
    const onClose = () => {
        alert('Transaction was not completed, window closed.');
    }
    const navigateTO = (e) => {
        if (currentUser) {
            navigate(`/${currentUser.id}/account-setting`)
        }
    }
    const HandlePaymentSubmit = pin => {
        if (currentUser.pin===pin){
            const newAmount = amount * 100
            var obj ={}
            if (paymentPlatform==="Paystack"){
                obj = {
                    publicKey: PAYSTACK_PUBLIC_KEY,
                    email: currentUser.email,
                    amount: newAmount,
                    currency: 'NGN',
                    reference: '' + Math.floor((Math.random() * 1000000000) + 1),
                    metadata: { 
                        name: currentUser.user_name, 
                        phone: currentUser.phone 
                }}
            }
            if (paymentPlatform==="Flutterwave"){
                obj = {
                    public_key: FLUTTERWAVE_PUBLIC_KEY,
                    amount,
                    currency: 'NGN',
                    tx_ref: '' + Math.floor((Math.random() * 1000000000) + 1),
                    payment_options: "card,mobilemoney,ussd",
                    customer: { 
                        email: currentUser.email,
                        name: currentUser.user_name, 
                        phone: currentUser.phone 
                    },
                }
            }

            setConfig(obj)
        } else {
            const item = document.querySelector(".pin-modal__item-row:last-child .item")
            item.insertAdjacentHTML('afterbegin', `<span class="msg">invalid pin</span>`)
        }
    }
    useEffect(() => {
        if (Object.keys(config).length){
            removePinModal({target:{className:"cancel"}})
            if (paymentPlatform==="Paystack") initializePaystackPayment(onSuccess, onClose)
            else if (paymentPlatform==="Flutterwave"){
                initializeFlutterPayment({
                    callback: (response) => onSuccess(response),
                    onclose
                })
            }
        }
    }, [config, pinInput])

    return (
        <div className="pin-modal" onClick={e => removePinModal(e)}>
            <div className="pin-modal__content">
                <div className="pin-modal__item">
                    <div className="pin-modal__item-row">
                        <div className="item">
                            {
                                paymentPlatform==="Paystack" 
                                ? <img  className="paystack" src={require(`../../Media/images/paystack/paystack.png`)}/>    
                                : <img  className="flutterwave" src={require(`../../Media/images/flutterwave/flutterwave.png`)}/>                                        
                            }
                            <div>
                                <h2>megabright007@gmail.com</h2>
                                <h2>Pay <span style={{color:"var(--green)"}}>NGN {amount}</span></h2>
                            </div>
                        </div>
                    </div>
                    <div className="pin-modal__item-row">
                        <div className="item">
                            <h1>Please enter your 4-digit pin to authorize this payment</h1>
                            <Link onClick={e => navigateTO(e)}>
                                Go to setting to create one 
                            </Link>
                        </div>
                        
                    </div>
                    <div className="pin-modal__item-row">
                        <form >
                            <div className="item">
                                <div className="input-place" >
                                    {
                                        pinInput.map((i, ind) => 
                                            <input 
                                                key={ind}
                                                inputtype="PinInput"
                                                name={i.name}
                                                type={i.type}
                                                value={i.value}
                                                onChange={(e) => HandleChange(e, ind)}
                                                required  />
                                        )
                                    }
                                    </div>
                                </div>
                        </form>
                            <button className="change" onClick={e => removePinModal(e)}>Change payment method</button>
                        <button className="cancel" onClick={e => removePinModal(e)}><span style={{marginRight:"5px"}}>x</span>Cancel</button>
                    </div>
                    

                </div>
            </div>
        </div>
    )
}
const mapStateToProps = createStructuredSelector({
    checkout_details: selectCheckoutDetails,
    currentUser: selectCurrentUser,
    payment_options: selectPaymentOptions,
    isFetching: selectIsFetchingCheckout
})
export default connect(mapStateToProps)(PinModal);




























// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import "./pin-modal.styles.css";
// import { createStructuredSelector} from "reselect"; 
// import { connect, useDispatch } from 'react-redux';
// import { usePaystackPayment, PaystackButton } from "react-paystack";
// import { selectCheckoutDetails, selectPaymentOptions } from "../../redux/checkout/checkout.selectors";
// import { selectCurrentUser } from "../../redux/user/user.selector";
// import { PAYSTACK_PUBLIC_KEY } from "./constant";
// import { completePaymentStart, paymentOptionsStart } from "../../redux/checkout/checkout.action";
// import { selectIsFetchingCheckout } from "../../redux/checkout/checkout.selectors";







// const PinModal = ({currentUser, removePinModal, paymentDetails}) => {
//     const { cardType, paymentPlatform, transactionType, amount } = paymentDetails
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const [config, setConfig] = useState({})
//     const [pinInput, setPinInput] = useState([
//         {name:"pin1", value:"", type:"number"},
//         {name:"pin2", value:"", type:"number"},
//         {name:"pin3", value:"", type:"number"},
//         {name:"pin4", value:"", type:"number"},
//     ])
//     const HandleChange = (e, id) => {
//         const {value, name} = e.target
//         const item = document.querySelector(".pin-modal__item-row:last-child .item")
//         if (item.querySelector(".msg")) item.querySelector(".msg").remove()
        
//         if (pinInput[id].value===""){
//             var newPinInput = pinInput.map((i, ind) => {
//                 if (ind===id) {
//                     i.value=value
//                     return i
//                 }
//                 else if (ind!==id && i.value) {
//                     i.type="password"
//                     return i
//                 }
//                 i.type="number"
//                 return i
//             })
//             setPinInput(newPinInput)
//         } else {
//             var newPinInput = pinInput.map((i, ind) => {
//                 if (ind===id) {
//                     i.value=""
//                     return i
//                 }
//                 return i
//             })
//             setPinInput(newPinInput)
//         }
//         const emptyInput = pinInput.find(i => i.value==="")
//         if (!emptyInput){
//             const allValues = pinInput.map(i => i.value).join('')
//             HandlePaymentSubmit(allValues)
//         }
        
//     }
//     // const initializePayment = usePaystackPayment(config);
//     const onSuccess = (response) => {
//         if (response)
//             // dispatch(completePaymentStart({...checkout_bet_details, payment_option:1, ref: response.reference}))
//             dispatch(completePaymentStart({paymentDetails, ref: response.reference}))
//         else alert("Something is wrong, Paystack returned no ref")

//     }
//     const onClose = () => {
//         alert('Transaction was not completed, window closed.');
//     }
//     const navigateTO = (e) => {
//         if (currentUser) {
//             navigate(`/${currentUser.id}/account-setting`)
//         }
//     }
//     const HandlePaymentSubmit = pin => {
//         if (currentUser.pin===pin){
//             const newAmount = amount * 100
//             const publicKey = paymentPlatform==="Paystack" ? PAYSTACK_PUBLIC_KEY : null
//             const obj = {
//                 publicKey,
//                 email: currentUser.email,
//                 amount: newAmount,
//                 currency: 'NGN',
//                 reference: '' + Math.floor((Math.random() * 1000000000) + 1),
//                 metadata: { 
//                     name: currentUser.user_name, 
//                     phone: currentUser.phone 
//                 },
//             }
//             setConfig(obj)
//         } else {
//             const item = document.querySelector(".pin-modal__item-row:last-child .item")
//             item.insertAdjacentHTML('afterbegin', `<span class="msg">invalid pin</span>`)
//         }
//     }
//     useEffect(() => {
//         if (Object.keys(config).length){
//             removePinModal({target:{className:"cancel"}})
//             // initializePayment(onSuccess, onClose)
//         }
//     }, [config])

//     return (
//         <div className="pin-modal" onClick={e => removePinModal(e)}>
//             <div className="pin-modal__content">
//                 <div className="pin-modal__item">
//                     <div className="pin-modal__item-row">
//                         <div className="item">
//                             {
//                                 paymentPlatform==="Paystack" 
//                                 ? <img  className="paystack" src={require(`../../Media/images/paystack/Paystack.png`)}/>    
//                                 : <img  className="flutterwave" src={require(`../../Media/images/flutterwave/flutterwave.png`)}/>                                        
//                             }
//                             <div>
//                                 <h2>megabright007@gmail.com</h2>
//                                 <h2>Pay <span style={{color:"var(--green)"}}>NGN {amount}</span></h2>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="pin-modal__item-row">
//                         <div className="item">
//                             <h1>Please enter your 4-digit pin to authorize this payment</h1>
//                             <Link onClick={e => navigateTO(e)}>
//                                 Go to setting to create one 
//                             </Link>
//                         </div>
                        
//                     </div>
//                     <div className="pin-modal__item-row">
//                         <form >
//                             <div className="item">
//                                 <div className="input-place" >
//                                     {
//                                         pinInput.map((i, ind) => 
//                                             <input 
//                                                 key={ind}
//                                                 inputtype="PinInput"
//                                                 name={i.name}
//                                                 type={i.type}
//                                                 value={i.value}
//                                                 onChange={(e) => HandleChange(e, ind)}
//                                                 required  />
//                                         )
//                                     }
//                                     </div>
//                                 </div>
//                         </form>
//                             <button className="change" onClick={e => removePinModal(e)}>Change payment method</button>
//                         <button className="cancel" onClick={e => removePinModal(e)}><span style={{marginRight:"5px"}}>x</span>Cancel</button>
//                     </div>
                    

//                 </div>
//             </div>
//         </div>
//     )
// }
// const mapStateToProps = createStructuredSelector({
//     checkout_details: selectCheckoutDetails,
//     currentUser: selectCurrentUser,
//     payment_options: selectPaymentOptions,
//     isFetching: selectIsFetchingCheckout
// })
// export default connect(mapStateToProps)(PinModal);


