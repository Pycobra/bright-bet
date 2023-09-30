import { createStore, applyMiddleware } from "redux"
import logger from "redux-logger"
import { persistStore } from "redux-persist"
import rootReducer from "./root-reducer"
// import ReduxThunk from "redux-thunk"
import createSagaMiddleware from "redux-saga";
import rootSaga  from "./root-sagas.js";



const sagaMiddleware = createSagaMiddleware()

// const middleware = [ReduxThunk]
const middleware = [sagaMiddleware]

// loger log out the conditions of the state to us in developer tool place
if (process.env.NODE_ENV === 'development'){
    middleware.push(logger)
}
//we cud use the below but cos we want to ability to add more middleware, we made it an array like above
//const store = createStore(rootReducer, applyMiddleware(logger))
export const store = createStore(rootReducer, applyMiddleware(...middleware))

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)

export default { store, persistor };


