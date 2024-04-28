//TODO: Implement the production planning logic here
import {
  ProductionProgramm,
  ProductProduction,
  Salesorder,
  ProductionForcast,
  PlanningTimeslot,
  PlanningWorkstation,
  PlanningWarehouseStock,
} from "../types/productionPlanningTypes";

//__Helping Objects

//_Simulated PlanningWarehouseStock 
//Function fill PlanningWarehouseStock with current values

//Funktion replicate PlanningWarehouseStock for use in Production Planning

//__Produktion Planning

//Define starting Point
//-start with most used workstations
//-start with most avaliabel material
//-set a Production Order

//Define Contraint with Dependency Mapping or Material Capacity
//constrain Material
//set already blocked timeslots from previous Period

//Loop at Orders

//Check - Material availabe
//Check - next free Timeslot


//Change - PlanningWarehouseStock
//Change - Change Timeslot - Umrüstzeit
//Change - Change Timeslot - Durchlaufzeit

//Endloop

//Evaluating Solution
//Count - Umrüstzeiten

//Change Starting Point
//Splitt Production Order from Item with most Umrüstzeiten

//__Result
//Production Order
//Time needed for Machienes