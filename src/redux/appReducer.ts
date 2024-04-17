import { combineReducers } from "@reduxjs/toolkit";
import global from "./slices/global";
import inputXML from "./slices/inputXML";


const appReducer = combineReducers({
  global,
  inputXML,
});

export { appReducer };
