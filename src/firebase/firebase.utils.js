 // Import the functions you need from the SDKs you need
 import firebase from "firebase/compat/app"
 import "firebase/compat/auth"
 import "firebase/compat/firestore"
 import Paystack from "../payment-utils/paystack/paystack";
 import Flutter from "../payment-utils/flutterwave/flutterwave";
//  import { getAnalytics } from "firebase/analytics";
import { Timestamp } from 'firebase/firestore'
import moment from 'moment';





const date = new Date();
//moment().format('llll')  // Timestamp.fromDate(new Date()) //toDate() =  //toDateString() / toLoclTimeString()


const firebaseConfig = {
  apiKey: "AIzaSyA8F8qOvd2IsK9uyoGRPWIB04gs67fNkm4",
  authDomain: "bet-app-1dc0b.firebaseapp.com",
  projectId: "bet-app-1dc0b",
  storageBucket: "bet-app-1dc0b.appspot.com",
  messagingSenderId: "778852238455",
  appId: "1:778852238455:web:6daf2784953e26bd037272",
  measurementId: "G-1JSK37DV3V"

};
export const createOrFetchUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return('you are offline');
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  
  // const collectionRef = firestore.collection('users');

  const snapShot = await userRef.get();
  // const collectionSnapshot = await collectionRef.get()
  if (!snapShot.exists){ 
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    const amount = parseFloat(0)
    const is_active = true
    try{
      await userRef.set({
        displayName, 
        email,
        amount,
        is_active,
         createdAt, 
         ...additionalData})
    } catch(error){
      console.log('error creating user, Because', error.message)
      return error.message
    }
  }
  return userRef;
};

export const adjustUserAccount = async (userAuth, payload, action) => {
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (snapShot.exists){ 
    try{
      const userData=  snapShot.data()
      if (action==="pin"){
          userData["pin"] = payload
          await userRef.update(userData)
      } else if (action==="activation"){
          userData["is_active"] = payload
          await userRef.update(userData)
      } else if (action==="password"){

      }
    } catch(error){
      console.log('error creating user, Because', error.message)
      return error.message
    }
  }
  return userRef;
};
// ==========================================================================

export const getPaymentOptionsFromFirebase = async () => {
  const paymentOptionQueryRef = firestore.collection(`/paymentOptions`)
  try{
    const paymentOptionSnapShot = await paymentOptionQueryRef.get();
    const paymentOptionsDocs = paymentOptionSnapShot.docs.map((i) => i.exists ? i.data() : null)
                                                        .filter(i => i)
    return paymentOptionsDocs
  } catch(error){
    console.log(`error getting payment options, because: ` , error.message)
    return error.message
  }
  return paymentOptionQueryRef
}
// ====================================================================================


export const getBookingCodeFromFirebase = async (bookingCode) => {
  try{
    if (bookingCode){
        const bookingRef = firestore.doc(`/bookedBet/${bookingCode.toUpperCase()}`)
        const bookingSnapShot = await bookingRef.get();
        return bookingSnapShot
    } else  {
        const bookingRef = firestore.collection(`/bookedBet`)
        const bookingSnapShot = await bookingRef.get();
        return bookingSnapShot
    }
  } catch(error){
    console.log(`error getting coupon, Because: ` , error.message)
    return error.message
  }
} 

export const postBookingCodeDocument= async (dataContent) => {
  const { bookingCode, ...otherVals} = dataContent
    const bookingRef = firestore.doc(`bookedBet/${bookingCode}`)
    try{
        await bookingRef.set({...otherVals})
    } catch(error){
      console.log(`failed booking a game, because: ` , error.message)
      return error.message
  }
    return bookingRef
}
export const postCouponDocument = async (dataContent) => {
  const { bookingCode, totalStake } = dataContent
    try{
      const userAuth =  await getCurrentUser()
      const userRef = firestore.doc(`users/${userAuth.uid}`)
      const userSnapShot = await userRef.get();

      const betSlipId = createBetSlipId(userSnapShot.id)
      var fields = {bookingCode, transactionType:"Bet-Sport", amount:totalStake, createdAt:new Date(), updatedAt:null, verified:false}
      await CreateOrFetchUserTransaction(fields, userAuth, betSlipId)

      const bookingRef = firestore.doc(`bookedBet/${bookingCode}`)
      const bookingSnapShot = await bookingRef.get();
      if (bookingSnapShot.exists){
          const userData = userSnapShot.data()
          var newAmount = parseInt(userData['amount']) - parseInt(totalStake)

          var fields = {updatedAt:new Date(), verified:true, status:"success", balance:newAmount}
          await CreateOrFetchUserTransaction(fields, userAuth, betSlipId)  

          userData['amount'] = newAmount
          await userRef.update(userData)
          return userData
      }
    } catch(error){
      console.log(`failed creating coupon, because: ` , error.message)
      return error.message
  }
}



// ====================================================================================

const createBetSlipId = (userID, type) => {
  const characters= "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const min = 10
  const max = 11
  const num = (Math.random() * (max - min + 1)) + min
  const characterLength = characters.length;
  var betSlipId = ""
  for (let i=0; i<num; i++){
    betSlipId += characters.charAt(Math.floor(Math.random() * characterLength));
  }
  if (type==="randomId") return betSlipId
  else return betSlipId + '-' + userID
}
export const completeFirebaseCheckout = async ({paymentDetails, ref}) => {
  const{ amount, cardType, paymentPlatform, transactionType } = paymentDetails
//  const {bookingCode, totalStake} = dataContent
  const userAuth =  await getCurrentUser()
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const userSnapShot = await userRef.get();
  const userData = userSnapShot.data()
  try{
      const transactionId = createBetSlipId(userSnapShot.id, "randomId")
      var fields = {...paymentDetails, createdAt:new Date(), updatedAt:null, verified:false}
      await CreateOrFetchUserTransaction(fields, userAuth, transactionId)
      console.log(paymentDetails, ref)
      const paystack = new Paystack(ref, amount)
      const flutter = new Flutter(ref, amount)
      const {paymentVerified, verificationStatus} = paymentPlatform==="Paystack"
          ? await paystack.verifyPayment() : paymentPlatform==="Flutterwave" 
          ? await flutter.verifyPayment() : {}
      if (paymentVerified){
          const userData = userSnapShot.data()
          if (transactionType === "Deposit"){
            var newAmount = parseInt(userData['amount']) + parseInt(amount)
          } else if(transactionType === "Withdraw"){
            var newAmount = parseInt(userData['amount']) - parseInt(amount)
          }
          var fields = {updatedAt:new Date(), verified:true, status:verificationStatus, balance:newAmount}
          const transactionSnapShotData = await CreateOrFetchUserTransaction(fields, userAuth, transactionId)
          const CheckoutDocsData = await CreateOrFetchCheckout(ref, transactionId)
          
          userData['amount'] = newAmount
          await userRef.update(userData)
          const allSnapShots = {CheckoutDocsData, transactionSnapShotData}
          return allSnapShots
      }
    } catch(error){
      console.log(`processing payment failed, because: ` , error.message)
      return error.message
  }
    return null
}

export const CreateOrFetchUserTransaction = async (fields, userAuth, transactionId) => {
  try{
      if (userAuth){
        var userTransactionRef = firestore.doc(`transaction/${userAuth.uid}`)
        const transactionSnapShot = await userTransactionRef.get();
        const transactionSnapShotData = transactionSnapShot.data()
        if (transactionId){
          if (transactionSnapShotData){
              const transactionData = transactionSnapShotData[`${transactionId}`]
              if (transactionData && fields){
                  const {updatedAt, verified, status, balance} = fields
                  //to update a particular transaction
                  transactionData['updatedAt'] = updatedAt
                  transactionData['verified'] = verified
                  transactionData['status'] = status
                  transactionData['balance'] = balance
                  await userTransactionRef.update({...transactionSnapShotData})
              } else if (!transactionData && fields) {
                  //to enter a new trasaction into existing transaction table
                  transactionSnapShotData[`${transactionId}`] = {...fields}
                await userTransactionRef.update({...transactionSnapShotData})
              } else if (!fields){
                //to retrieve a particular transanction from user transaction table
                return transactionData
              }
          } else {
            //to create table and enter user first transaction
              await userTransactionRef.set({[transactionId]:{...fields}})
          }
        }
        // console.log(transactionSnapShot, "transactionSnapShotData")
        // console.log(transactionSnapShotData, "transactionSnapShotData")
        return transactionSnapShotData
      } else if(!userAuth && transactionId) {
          const userTransactionRef = firestore.collection(`/transaction`)
          const transactionSnapShot = await userTransactionRef.get();
          const transactionSnapShotData = transactionSnapShot.docs.map(i => i.data()[`${transactionId}`])
                                          .find(i => i)
          return transactionSnapShotData
      }
     } catch(error){
      console.log(`creating transaction reciept failed, because: ` , error.message)
      return error.message
    }
}

export const CreateOrFetchCheckout = async (ref, transactionId) => {
  // const userAuth =  await getCurrentUser()
  // var transactionRef = firestore.doc(`Checkout/${userAuth.uid}`)
  const CheckoutQueryRef = firestore.collection(`/Checkout`)
  try{
      if (ref && transactionId){
          await CheckoutQueryRef.add({ref, transactionId, createdAt:new Date()})
      }
      const CheckoutSnapShot = await CheckoutQueryRef.get();
      const CheckoutDocsData = CheckoutSnapShot.docs.map(i => i.data())
      return CheckoutDocsData
  } catch(error){
    console.log(`creating checkout failed, because: ` , error.message)
    return error.message
  }
}

// ====================================================================================



export const reauthenticate = (currentPassword) => {
  const user = auth.currentUser
  const cred = auth.emailAuthProvider.credential(
    user.email, currentPassword
  )
  return user.reauthenticateWithCredential(cred)
}
export const updateOfNewPassword = async (newPassword, oldPassword) => {
  const user = auth.currentUser
  try {
    // await reauthenticate(oldPassword)
    await user.updatePassword(newPassword)
  } catch (error){
    console.log(`change of password failed, because: ` , error.message)
    return error.message
  }
  return user
}
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unSuscribe = auth.onAuthStateChanged(userAuth => {
      unSuscribe(); 
      resolve(userAuth);
    },
    reject)
  })
}
 // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;












