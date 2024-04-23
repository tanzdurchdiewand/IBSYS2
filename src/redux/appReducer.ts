import { combineReducers } from "@reduxjs/toolkit";
import global from "./slices/global";
import inputXML from "./slices/inputXML";
import inputProduction from "./slices/inputProduction";


const appReducer = combineReducers({
  global,
  inputXML,
  inputProduction,
});

export { appReducer };
