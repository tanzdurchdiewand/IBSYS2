import { combineReducers } from "@reduxjs/toolkit";
import global from "./slices/global";
import inputXML from "./slices/inputXML";
import inputProduction from "./slices/inputProduction";
import inputMaterialPlanning from "./slices/inputMaterialPlanning";


const appReducer = combineReducers({
  global,
  inputXML,
  inputProduction,
  inputMaterialPlanning
});

export { appReducer };
