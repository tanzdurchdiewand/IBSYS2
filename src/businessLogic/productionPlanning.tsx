//TODO: Implement the production planning logic here
import { setProductionPlan } from "../redux/slices/productionPlanning";
import { RootState, useDispatch, useSelector } from "../redux/store";
import {
  ProductionProgramm,
  ProductProduction,
  SalesOrder,
  ProductionForcast,
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

  console.log(productionProgramm, XML?.results.forecast.p1);
  const dispatch = useDispatch();

  const data: ProductionPlan = {
    productionPlan: [],
  };

  dispatch(setProductionPlan(data));

  return (
    <div>
      <h1>Production Planning</h1>
    </div>
  );
}

//__Helping Objects

//_Simulated PlanningWarehouseStock
//Function fill PlanningWarehouseStock with current values

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
