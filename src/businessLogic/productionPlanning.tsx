//TODO: Implement the production planning logic here
import { setProductionPlan } from "../redux/slices/productionPlanning";
import { RootState, useDispatch, useSelector } from "../redux/store";
import { P1Planning } from "../types/materialPlanningTypes";
import {
  ProductionProgramm,
  ProductProduction,
  SalesOrder,
  ProductionForecast,
  PlanningTimeslot,
  PlanningWorkstation,
  PlanningWarehouseStock,
  ProductionPlan,
} from "../types/productionPlanningTypes";

export default function ProductionPlanning() {
  const { productionProgramm } = useSelector(
    (state: RootState) => state.inputProduction.list
  );
  const { XML } = useSelector((state: RootState) => state.inputXML.list);

  // console.log(productionProgramm, XML?.results.forecast.p1);
  const dispatch = useDispatch();

  const data: ProductionPlan = {
    productionPlan: [],
  };

  dispatch(setProductionPlan(data));

  SetProductionGoals();

  return (
    <div>
      <h1>Production Planning</h1>
    </div>
  );
}

//_Helping Objects
//vorhandene Materialien am Anfang
let warehousestock: ProductionPlan;

//vorhandene Materialien während des Algorithmus
let warehousestock_work: ProductionPlan;

//zu produzierende Materialien
let productionOrder: ProductionPlan;

//_Simulated PlanningWarehouseStock
//Function fill PlanningWarehouseStock with current values
export function SetProductionGoals() {
  const { initialPlanning } = useSelector(
    (state: RootState) => state.inputMaterialPlanning
  );
  console.log(initialPlanning);

  //splitt
  const p1 = initialPlanning?.P1;
  const p2 = initialPlanning?.P2;
  const p3 = initialPlanning?.P3;
  console.log(p1);

  //if (p1 !== undefined) {
  //  p1.forEach((p1: P1Planning) => console.log(p1));
  //}
}
//Funktion replicate PlanningWarehouseStock for use in Production Planning

//__Produktion Planning

//Missing previous Waitinglist
//Missung mutiused Halbfabrikate und Kaufteile

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
//Time needed for Machines/Workstations
