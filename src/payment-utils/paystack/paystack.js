import apiInstance from '../useAxios';
import { usePaystackPayment, PaystackButton } from "react-paystack";
import moment from 'moment';

class Paystack {
    constructor(ref, amount){
        this.ref = ref
        this.amount = amount
    }
    async verifyPayment() {
        const response = await apiInstance.get(`/transaction/verify/${this.ref}`)
                    .then(res => res).catch(err => err.response)
        
        var paymentVerified = false
        var verificationStatus = "failed"
        if (response.status === 200){
            const {data:{status, data}} = response
            if (status){
                const stake_amount=parseInt(this.amount)
                const payment_amount = parseInt(data['amount'])
                if (payment_amount / 100 === stake_amount){
                    verificationStatus = data.status
                    paymentVerified = true
                }
            }
        }
        return {paymentVerified, verificationStatus}
    }
}
export default Paystack;


