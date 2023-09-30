import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./transaction.styles.css";
import { createStructuredSelector} from "reselect"; 
import { connect, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBank, faInfoCircle } from "@fortawesome/free-solid-svg-icons";




const Transaction = ({ currentUser, transactions, errMsg }) => {
    const dispatch = useDispatch()
    const [headers, setHeaders] = useState([
        {name:'All Categories', active:true},{name:"Deposits", active:false}, 
        {name:"Withdrawal", active:false},{name:"Bets", active:false}, 
        {name:"Winnings", active:false},{name:"Refunds", active:false}])
    const [currentTransaction, setCurrentTransaction] = useState(transactions)

    
    const HandleHeaders = e => {
        const txt = e.currentTarget.querySelector("span").textContent
        const head = headers.map(i => {
            if (i.name === txt) {
                if (txt==="All Categories"){
                    setCurrentTransaction(transactions)
                } else if (txt==="Deposits"){
                    const data = transactions.filter(i => i.transactionType==="Deposit")
                    setCurrentTransaction(data.length ? data : null)
                } else if (txt==="Withdrawal"){
                    const data = transactions.filter(i => i.transactionType==="Withdraw")
                    setCurrentTransaction(data.length ? data : null)
                } else if (txt==="Bets"){
                    const data = transactions.filter(i => i.transactionType==="Bet-Sport")
                    setCurrentTransaction(data.length ? data : null)
                } else if (txt==="Refunds"){
                    const data = transactions.filter(i => i.transactionType==="Refunds")
                    setCurrentTransaction(data.length ? data : null)
                } else if (txt==="Winnings"){
                    const data = transactions.filter(i => i.transactionType==="Winnings")
                    setCurrentTransaction(data.length ? data : null)
                }
                return {...i, active:true} 
            }
            return  {...i, active:false}})
        setHeaders(head)
    }
    const [userErrorMsg, setUserErrorMsg] = useState()
    useEffect(() => {
        if (errMsg){
            if (errMsg.type==="Network Error"){
                alert(errMsg.msg)
            } else if (errMsg.type==="Field Error"){
                setUserErrorMsg(errMsg.msg)
            }
        }
        setCurrentTransaction(transactions)
    }, [errMsg, transactions])
    
    return (
            <div className="transaction">
                <div className="transaction__wrap">
                        <div className="transaction-table">
                            <div className="transaction-table__item head">
                                <ul>
                                    {
                                        headers.map(({name, active}) =>
                                        <li key={name} className={`${active ? "active" : ""}`} onClick={e => HandleHeaders(e)}>
                                            <span>{name}</span>
                                        </li>
                                        )
                                    }
                                </ul>
                            </div>
                            <div className="transaction-table__item">
                                <div>
                                    <FontAwesomeIcon icon={faBank} />
                                    <span>ALL BANK DETAILS BELOW</span>
                                </div>
                                <h2>this are where all your transactions lives</h2>
                            </div>
                            <div className="transaction-table__item">
                                <table>
                                    <thead>
                                        <tr className="head">
                                            <th>Time</th>
                                            <th>Type</th>
                                            <th>Trade No.</th>
                                            <th>Status</th>
                                            <th>Amount</th>
                                            <th>Balance</th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                        {
                                            currentTransaction
                                                ? currentTransaction.map(i => 
                                                        <tr key={i.ref}>
                                                            <td>{i.transactionDate}</td>
                                                            <td>{
                                                                i.transactionType==="Withdraw" 
                                                                ? "Withdrawal" 
                                                                : i.transactionType
                                                            }</td>
                                                            <td>{
                                                                i.ref.length > 12 
                                                                ? i.ref.slice(0,12) + '...'
                                                                : i.ref
                                                            }</td>
                                                            <td>{i.status}</td>
                                                            <td>{
                                                                i.transactionType==="Deposit" || i.transactionType==="Winnings"
                                                                || i.transactionType==="Refund" 
                                                                ? "+" + parseInt(i.amount).toLocaleString('en-US', {
                                                                            style: 'currency',
                                                                            currency: "NGN"
                                                                        }).slice(3,)
                                                                : i.transactionType==="Withdraw" || i.transactionType==="Bet-Sport"
                                                                ? "-" + parseInt(i.amount).toLocaleString('en-US', {
                                                                            style: 'currency',
                                                                            currency: "NGN"
                                                                        }).slice(3,)
                                                                : null
                                                            }</td>
                                                            <td>{
                                                                parseInt(i.balance).toLocaleString('en-US', {
                                                                    style: 'currency',
                                                                    currency: "NGN"
                                                                }).slice(3,)
                                                            }</td>
                                                            <td><FontAwesomeIcon icon={faInfoCircle} /></td>
                                                        </tr>
                                               )
                                               : <tr className="msg">
                                                    {
                                                        userErrorMsg
                                                        ? <td>{userErrorMsg}</td>
                                                        : <td>You have no data for {headers.find(({name, active}) => active).name}</td>
                                                    }
                                               </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                </div>
            </div>
        )
}

export default Transaction;


