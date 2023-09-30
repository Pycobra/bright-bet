// import { take, takeEvery, takeLatest, all, call, put } from "redux-saga/effects"
// import { ShopActionTypes } from "./shop.types"
// import { firestore, convertCollectionsSnapshotToMap, 
//     convertCategorySnapshotToMap, 
//     convertProductTypeSnapshotToMap } from "../../firebase/firebase.utils"
// import {  
//     fetchCategoryFailure,
//     fetchProductTypesFailure,
//     fetchCollectionsFailure, 
//     fetchCollectionsSuccess,
//     fetchCategorySuccess,
//     fetchProductTypesSuccess,
//     getCollectionsFailure, 
//     getCollectionsSuccess,
//     handleChkBtnFromSearchSuccess,
//     handleChkBtnFromSearchFailure,
// } from "./shop.action"


// export function* fetchCollectionsStartAsync() {
//     try{
//         const collectionRef = firestore.collection('collections')
//         const collectionSnapShot = yield collectionRef.get()
//         const collectionsMap = yield call(convertCollectionsSnapshotToMap, collectionSnapShot)
//         yield put(fetchCollectionsSuccess(collectionsMap))
//     } catch (error){
//         yield put(fetchCollectionsFailure(error.message))
//     }
// }
// export function* fetchCategoryStartAsync() {
//     try{
//         const categoryRef = firestore.collection('categories')
//         const categorySnapShot = yield categoryRef.get()
//         const categoryMap = yield call(convertCategorySnapshotToMap, categorySnapShot)
//         yield put(fetchCategorySuccess(categoryMap))
//     } catch (error){
//         yield put(fetchCategoryFailure(error.message))
//     }
// }
// export function* fetchProductTypeStartAsync() {
//     try{
//         const productTypeRef = firestore.collection('product types')
//         const productTypeSnapShot = yield productTypeRef.get()
//         const productTypeMap = yield call(convertProductTypeSnapshotToMap, productTypeSnapShot)
//         yield put(fetchProductTypesSuccess(productTypeMap))
//     } catch (error){
//         yield put(fetchProductTypesFailure(error.message))
//     }
// }
// export function* getCollectionsStartAsync({payload}) {
//     try{
//         yield put(getCollectionsSuccess(payload))
//     } catch (error){
//         yield put(getCollectionsFailure(error.message))
//     }
// }
// export function* getHandleCheckBtnFromSearchStart({payload}) {
//     try{
//         yield put(handleChkBtnFromSearchSuccess(payload))
//     } catch (error){
//         yield put(handleChkBtnFromSearchFailure(error.message))
//     }
// }

// export function* fetchCollectionsStart() {
//     yield takeLatest(ShopActionTypes.FETCH_COLLECTION_START, 
//     fetchCollectionsStartAsync)
// }
// export function* fetchCategoryStart() {
//     yield takeLatest(ShopActionTypes.FETCH_COLLECTION_START, 
//     fetchCategoryStartAsync)
// }
// export function* fetchProductTypeStart() {
//     yield takeLatest(ShopActionTypes.FETCH_COLLECTION_START, 
//     fetchProductTypeStartAsync)
// }
// export function* onGetCollectionsStart() {
//     yield takeLatest(ShopActionTypes.GET_COLLECTION_START, 
//     getCollectionsStartAsync)
// }
// export function* onHandleCheckBtnFromSearchStart() {
//     yield takeLatest(ShopActionTypes.HANDLE_CHECK_BTN_FROM_SEARCH_START, 
//     getHandleCheckBtnFromSearchStart)
// }
// export function* shopSagas(){
//     yield all([ 
//         call(fetchCollectionsStart),
//         call(fetchCategoryStart),
//         call(fetchProductTypeStart),
//         call(onGetCollectionsStart), 
//         call(onHandleCheckBtnFromSearchStart), 
//         // call(onGetDiscountPercentStart), 
//         // call(onGetPriceDifferenceStart), 
//     ])
// }


