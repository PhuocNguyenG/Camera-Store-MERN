import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducers from "./reducer";
import mySaga from "../redux/sagas";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);

export default store;