import { combineReducers } from "@reduxjs/toolkit";
import global from "./slices/global";
import inputXML from "./slices/inputXML";
import inputProduction from "./slices/inputProduction";
import inputMaterialPlanning from "./slices/inputMaterialPlanning";
import inputOrderPlanning from "./slices/inputOrderPlanning";
import productionPlanning from "./slices/productionPlanning";
import inputCapacityPlanning from "./slices/inputCapacityPlanning";

const appReducer = combineReducers({
  global,
  inputXML,
  inputProduction,
  inputMaterialPlanning,
  productionPlanning,
  inputOrderPlanning,
  inputCapacityPlanning,
});

export { appReducer };
