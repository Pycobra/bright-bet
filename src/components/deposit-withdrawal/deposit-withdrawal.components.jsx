import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./deposit-withdrawal.styles.css";
import { createStructuredSelector} from "reselect"; 
import { connect, useDispatch } from 'react-redux';
import { selectCheckoutDetails, selectUserTransaction, selectPaymentOptions } from "../../redux/checkout/checkout.selectors";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { selectIsFetchingCheckout } from "../../redux/checkout/checkout.selectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import PinModal from "./pin-modal";






const DepositWithdrawal = ({currentUser, payment_options }) => {
    const [paymentDetails, setPaymentDetails] = useState()
    const [pinModalDisplay, setPinModalDisplay] = useState(false)
    const [amount, setAmount] = useState("")
    const [transactionType, setTransactionType] = useState(null)
    const HandlePaymentSubmit = e => {
        e.preventDefault()
        const { name } = e.target
        const card_type = e.target.closest('form').querySelector('h3').textContent
        setPaymentDetails(null)
        const place = document.querySelector(".banking__item .banking__item-row:nth-child(2) \
                .banking__item-row__item:nth-child(2)")
        if (currentUser){
            if (transactionType && amount){
                var is_valid = true
                if (transactionType==="Withdraw" && amount > currentUser.amount)var is_valid = false
                if (is_valid) setPaymentDetails({cardType: card_type, paymentPlatform: name, transactionType, amount})
                else {
                    place.classList.add("active")
                    place.querySelector("div").insertAdjacentHTML("afterbegin", 
                    `<span class="msg">N${currentUser.amount} available for withdrawal</span>`)
                }
            } else {
                if (!transactionType){
                    alert("choose between deposit and withdrawal")
                } else if (!amount){
                    place.classList.add("active")
                    place.querySelector("div").insertAdjacentHTML("afterbegin", `<span class="msg">enter ${
                        transactionType
                    } amount</span>`)
                } 
            }
        } else {
            alert("You are not logged in")
        }
    }

    const removePinModal = (e) => {
        const {className} = e.target
        if (className === "cancel" || className === "change" 
            || className === "pin-modal"){
            setPinModalDisplay(false)
        }
    }
    useEffect(() => {
        if (paymentDetails){
            const {paymentPlatform, cardType} = paymentDetails
            if (cardType==="BANK CARDS") setPinModalDisplay(true)
            else {
                alert('This payment method have not been activated')
            }
        }
    }, [paymentDetails])
    
    const HandleAction = (e) => {
        const text = e.target.textContent
        setTransactionType(null)
        setTimeout(
            () =>
                setTransactionType(text), 1000
        );
    }

    const HandleChange = (e) => {
        const {value} = e.target
        setAmount(value)
        const place = document.querySelector(".banking__item .banking__item-row:nth-child(2) \
                .banking__item-row__item:nth-child(2)")
        place.classList.remove("active")
        if (place.querySelector(".msg"))place.querySelector(".msg").remove()
    }

    return (
            <div className="banking">
                {
                    pinModalDisplay
                    ? <PinModal removePinModal={removePinModal} paymentDetails={paymentDetails}/>
                    : null
                }
                <div className="banking__wrap">
                    {
                        <div className="banking__item">
                            <div className="banking__item-row">
                                <div className="banking__item-row__item">
                                    <h1>ACCOUNT: 4567654567</h1>
                                    <h2>Available Types Of Payments</h2>
                                </div>
                                <div className="banking__item-row__item">
                                    <h1>AVAILABLE BALANCE</h1>
                                    <h2>({currentUser ? currentUser.amount : null})</h2>
                                </div>
                            </div>
                            <div className="banking__item-row">
                                <div className="banking__item-row__item">
                                    <button onClick={e => HandleAction(e)}>
                                        Deposit
                                        {
                                            transactionType === "Deposit"
                                            ? <FontAwesomeIcon style={{marginLeft:"5px", color:"white"}} icon={faCheck} />
                                            :null
                                        }
                                    </button>
                                    <button onClick={e => HandleAction(e)}>
                                        Withdraw
                                        {
                                            transactionType === "Withdraw"
                                            ? <FontAwesomeIcon style={{marginLeft:"5px", color:"white"}} icon={faCheck} />
                                            :null
                                        }
                                    </button>
                                </div>
                                <div className="banking__item-row__item">
                                    <span className="text">$</span>
                                    <div style={{display:"grid"}}>
                                        <input 
                                            inputtype="SmallInput"
                                            name="amount" 
                                            type='number' 
                                            placeholder="enter amount"
                                            value={amount}
                                            onChange={(e) => HandleChange(e)}
                                            required  /> 
                                    </div>
                                </div>
                            </div>
                            <div className="banking__item-row">
                                <span className={`msg ${transactionType ? "active" : ""}`}>Choose a Payment Method</span>
                            </div>
                            <div className="banking__item-row">
                                <form onClick={e => HandlePaymentSubmit(e)}>
                                    <h3>BANK CARDS</h3>
                                    <div className="body">
                                    {
                                        payment_options
                                        ? payment_options.map(i => 
                                            i.name === "Paystack" 
                                            ? <div key={i.name} className="img-block paystack-img">
                                                <img  name={i.name} src={require(`../../Media/images/paystack/Paystack.png`)}/>
                                            </div>
                                            : i.name === "Flutterwave" 
                                            ? <div key={i.name} className="img-block flutterwave-img">
                                                <img  name={i.name} src={require(`../../Media/images/flutterwave/flutterwave.png`)}/>
                                            </div>
                                            : null
                                        )
                                        : null
                                    }
                                    </div>
                                </form>
                                <form onClick={e => HandlePaymentSubmit(e)}>
                                    <h3>BANK TRANSFER</h3>
                                    <div className="body">
                                    {
                                        payment_options
                                        ? payment_options.map(i => 
                                            i.name === "Paystack" 
                                            ? <div key={i.name} className="img-block paystack-img">
                                                <img  name={i.name} src={require(`../../Media/images/paystack/Paystack.png`)}/>
                                            </div>
                                            : i.name === "Flutterwave" 
                                            ? <div key={i.name} className="img-block flutterwave-img">
                                                <img  name={i.name} src={require(`../../Media/images/flutterwave/flutterwave.png`)}/>
                                            </div>
                                            : null
                                        )
                                        : null
                                    }
                                    </div>
                                </form>
                                <form onClick={e => HandlePaymentSubmit(e)}>
                                    <h3>E - WALLET</h3>
                                    <div className="body">
                                    {
                                        payment_options
                                        ? payment_options.map(i => 
                                            i.name === "Paystack" 
                                            ? <div key={i.name} className="img-block paystack-img">
                                                <img  name={i.name} src={require(`../../Media/images/paystack/Paystack.png`)}/>
                                            </div>
                                            : i.name === "Flutterwave" 
                                            ? <div key={i.name} className="img-block flutterwave-img">
                                                <img  name={i.name} src={require(`../../Media/images/flutterwave/flutterwave.png`)}/>
                                            </div>
                                            : null
                                        )
                                        : null
                                    }
                                    </div>
                                </form>
                            </div>
                        </div>
                    }
                </div>
            </div>
    )
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    payment_options: selectPaymentOptions,
})
export default connect(mapStateToProps)(DepositWithdrawal);


