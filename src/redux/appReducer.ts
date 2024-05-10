import { combineReducers } from "@reduxjs/toolkit";
import global from "./slices/global";
import inputXML from "./slices/inputXML";
import inputMaterialPlanning from "./slices/inputMaterialPlanning";
import inputOrderPlanning from "./slices/inputOrderPlanning";
import productionPlanning from "./slices/productionPlanning";
import inputCapacityPlanning from "./slices/inputCapacityPlanning";
import inputProductionProgramm from "./slices/inputProductionProgramm";
import resultXml from "./slices/resultXml";

const appReducer = combineReducers({
  global,
  inputXML,
  inputProductionProgramm,
  inputMaterialPlanning,
  productionPlanning,
  inputOrderPlanning,
  inputCapacityPlanning,
  resultXml,
});

export { appReducer };
