import axios from 'axios';
import {PAYSTACK_BASE_URL, PAYSTACK_SECRET_KEY }  from './constant';
// import { PAYSTACK_SECRET_KEY } from "../.env"


const secret_key = process.env.PAYSTACK_SECRET_KEY 
const apiInstance = axios.create({
    baseURL: PAYSTACK_BASE_URL,
    timeout: 5000, // timeout after 5 seconds
    headers: {
        "Authorization": `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
        "cache-control": "no-cache"
    },
});

apiInstance.interceptors.response.use((response) => {
        return response;
    },
    async function(error){
        const originalRequest = error.config;
        if (typeof error.response === 'undefined') {
            alert('there is an issue with paystack server/connections');
            return  Promise.reject(error);
        }
        if (error.response.data.code === 'token_not_valid' &&
            error.response.status === 401 &&
            error.response.statusText === "Unauthorized") {
            alert("unauthorization error && token_not_valid")
        }
       else {
            return Promise.reject(error);
        }
    }
)
export default apiInstance;




