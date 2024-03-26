import { combineReducers } from "@reduxjs/toolkit";
import global from "./slices/global";

const appReducer = combineReducers({
  global,
});

export { appReducer };
