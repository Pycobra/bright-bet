import axios from 'axios';
import { FLUTTERWAVE_BASE_URL, FLUTTERWAVE_SECRET_KEY }  from './constant';
// import { PAYSTACK_SECRET_KEY } from "../.env"

// const express = require("express"); 
// const cors = require("cors"); 
// const app = express(); 
// var corsOptions = {
//     origin: "http://localhost:3000"
//   };
  
// app.use(cors(corsOptions));
const secret_key = process.env.FLUTTERWAVE_SECRET_KEY 
const apiInstance = axios.create({
    baseURL: FLUTTERWAVE_BASE_URL,
    timeout: 5000, // timeout after 5 seconds
    headers: {
        // "mode": "no-cors",
        // withCredentials: false,
        // statusCode: 200,
        "Authorization": `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', //'application/json',
        accept: 'application/json',
        "cache-control": "no-cache",
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
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




