import {combineReducers, createStore, applyMiddleware} from "@reduxjs/toolkit";
import {accountReducer} from "./slice/accountReducer"
import thunk from "redux-thunk";

export default () => {
  
  return createStore(combineReducers({
    account: accountReducer
  }, applyMiddleware(thunk))
  );
};
