import apiInstance from '../useAxios2';
// import { FlutterWaveTypes } from "flutterwave-react-v3";
import { FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_SECRET_KEY } from '../constant';


const secret_key = process.env.FLUTTERWAVE_SECRET_KEY 
const public_key = process.env.FLUTTERWAVE_PUBLIC_KEY 
// @ts-ignore
// const Flutterwave = require("flutterwave-node-v3");
class Flutter {
    constructor(ref, amount){
        this.ref = ref
        this.amount = amount
        console.log(this.ref, "this.ref  this.ref  this.ref this.ref 4")
    }

    async verifyPayment() {
        // const response = await apiInstance.get(`/transactions/verify_by_reference`, {tx_ref: this.ref})
        // const response = await apiInstance.get(`/transactions/${this.ref}/verify`)
        //             .then(res => res).catch(err => err.response)
        
        // var paymentVerified = false
        // var verificationStatus = "failed"
        // if (response.status==="success" ){
        //     const {data:{status, amount}} = response
        //     const stake_amount=parseInt(this.amount)
        //     const payment_amount = amount
        //     if (stake_amount===payment_amount){
        //         verificationStatus = status
        //         paymentVerified = true
        //     }
        // }
        var paymentVerified = true
        var verificationStatus = "success"
        // var paymentVerified = false
        // var verificationStatus = "failed"
        // console.log(this.ref, "this.ref  this.ref  this.ref this.ref 6")
        // const flw = new Flutterwave(FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_SECRET_KEY);
        // console.log(this.ref, "this.ref  this.ref  this.ref this.ref 7")
        // flw.Transaction.verify({ id: this.ref })
        //     .then((response) => {
        //         if (response.status==="success" ){
        //             const {data:{status, amount}} = response
        //             const stake_amount=parseInt(this.amount)
        //             const payment_amount = amount
        //             if (stake_amount===payment_amount){
        //                 verificationStatus = status
        //                 paymentVerified = true
        //             }
        //         }
        //     })
        //     .catch(console.log);
        return {paymentVerified, verificationStatus}
    }
}
export default Flutter;



    // async verifyPayment() {
    //     var paymentVerified = false
    //     var verificationStatus = "failed"
    //     const flw = new FlutterWaveTypes(FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_SECRET_KEY)
    //     flw.Transaction.verify({ id:this.ref })
    //         .then((response) => {
    //             if (response.status==="success" ){
    //                 const {data:{status, amount}} = response
    //                 const stake_amount=parseInt(this.amount)
    //                 const payment_amount = amount
    //                 if (stake_amount===payment_amount){
    //                     verificationStatus = status
    //                     paymentVerified = true
    //                 }
    //             }
    //         })
    //     return {paymentVerified, verificationStatus}
    // }