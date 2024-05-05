/* eslint-disable @typescript-eslint/no-unused-vars */
//TODO: Implement the production planning logic here
import { arrayBuffer } from "stream/consumers";
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
import {
  Article,
  GameData,
  WorkplaceOrdersInWork,
} from "../types/inputXMLTypes";

export default function ProductionPlanning() {
  //Redux
  const { productionProgramm } = useSelector(
    (state: RootState) => state.inputProduction.list
  );
  const dispatch = useDispatch();

  //workingarea
  const data: ProductionPlan = {
    productionPlan: [],
  };

  //requiered material for each product
  let p1: PlanningWarehouseStock[] = [];
  let p2: PlanningWarehouseStock[] = [];
  let p3: PlanningWarehouseStock[] = [];

  //get orders
  let productionOrders: PlanningWarehouseStock[] = SetProductionGoals(
    p1,
    p2,
    p3
  );

  //get available Materials
  let availabeMaterials: PlanningWarehouseStock[] = SetAvailableMaterials();

  //_loop
  //set starting order
  SetProductionOrder(productionOrders, availabeMaterials, p1, p2, p3);

  //Simulate
  SimulateProduction();

  //Elaluation of results
  EvaluateResult();

  //change starting order

  //endloop

  //not optimzed
  //Missing overtimes
  data.productionPlan = productionOrders;

  //Redux save
  dispatch(setProductionPlan(data));

  return (
    <div>
      <h1>Production Planning</h1>
    </div>
  );
}

//set total production orders
export function SetProductionGoals(
  pws1: PlanningWarehouseStock[],
  pws2: PlanningWarehouseStock[],
  pws3: PlanningWarehouseStock[]
) {
  //working structures/tables
  let productionOrder: PlanningWarehouseStock;
  let productionOrders: PlanningWarehouseStock[] = [
    {
      id: 1,
      amount: 0,
    },
    {
      id: 2,
      amount: 0,
    },
    {
      id: 3,
      amount: 0,
    },
    {
      id: 4,
      amount: 0,
    },
    {
      id: 5,
      amount: 0,
    },
    {
      id: 6,
      amount: 0,
    },
    {
      id: 7,
      amount: 0,
    },
    {
      id: 8,
      amount: 0,
    },
    {
      id: 9,
      amount: 0,
    },
    {
      id: 10,
      amount: 0,
    },
    {
      id: 11,
      amount: 0,
    },
    {
      id: 12,
      amount: 0,
    },
    {
      id: 13,
      amount: 0,
    },
    {
      id: 14,
      amount: 0,
    },
    {
      id: 15,
      amount: 0,
    },
    {
      id: 16,
      amount: 0,
    },
    {
      id: 17,
      amount: 0,
    },
    {
      id: 18,
      amount: 0,
    },
    {
      id: 19,
      amount: 0,
    },
    {
      id: 20,
      amount: 0,
    },
    {
      id: 26,
      amount: 0,
    },
    {
      id: 29,
      amount: 0,
    },
    {
      id: 30,
      amount: 0,
    },
    {
      id: 31,
      amount: 0,
    },
    {
      id: 49,
      amount: 0,
    },
    {
      id: 50,
      amount: 0,
    },
    {
      id: 51,
      amount: 0,
    },
    {
      id: 54,
      amount: 0,
    },
    {
      id: 55,
      amount: 0,
    },
    {
      id: 56,
      amount: 0,
    },
  ];

  //get inputMaterialPlanning
  const { initialPlanning } = useSelector(
    (state: RootState) => state.inputMaterialPlanning
  );

  //splitt inputMaterialPlanning to get required amounts for each product
  const p1 = initialPlanning?.P1;
  const p2 = initialPlanning?.P2;
  const p3 = initialPlanning?.P3;

  //set production orders for P1
  if (p1 !== undefined) {
    Object.entries(p1).forEach(([key, value]) => {
      //add values
      productionOrders.forEach((element) => {
        if (element.id === value.productName) {
          //add to productionOrders
          element.amount += value.productionOrder;
          //add to individual product pws1
          productionOrder = {
            id: element.id,
            amount: element.amount,
          };
          pws1.push(productionOrder);
        }
      });
    });
  }

  //set production orders for P2
  if (p2 !== undefined) {
    Object.entries(p2).forEach(([key, value]) => {
      //add values
      productionOrders.forEach((element) => {
        if (element.id === value.productName) {
          //add to productionOrders
          element.amount += value.productionOrder;
          //add to individual product pws2
          productionOrder = {
            id: element.id,
            amount: element.amount,
          };
          pws2.push(productionOrder);
        }
      });
    });
  }

  //set Production orders for P3
  if (p3 !== undefined) {
    Object.entries(p3).forEach(([key, value]) => {
      //add values
      productionOrders.forEach((element) => {
        if (element.id === value.productName) {
          //add to productionOrders
          element.amount += value.productionOrder;
          //add to individual product pws1
          productionOrder = {
            id: element.id,
            amount: element.amount,
          };
          pws3.push(productionOrder);
        }
      });
    });
  }

  return productionOrders;
}

//set total available material
export function SetAvailableMaterials() {
  //working structures/tables
  let articles: Article[] = [];
  let warehouseStockItem: PlanningWarehouseStock;
  let warehouseStockItems: PlanningWarehouseStock[] = [];

  //read inputXML
  const { list } = useSelector((state: RootState) => state.inputXML);

  if (
    list.XML !== null &&
    list.XML.results !== null &&
    list.XML.results.warehousestock !== null &&
    list.XML.results.warehousestock.article !== null
  ) {
    articles = list.XML.results.warehousestock.article;
  }

  //Move articles to warehouseStockItems
  articles.forEach((element) => {
    warehouseStockItem = {
      id: element.id,
      amount: element.amount,
    };
    warehouseStockItems.push(warehouseStockItem);
  });

  return warehouseStockItems;
}

//set first order
export function SetProductionOrder(
  productionOrders: PlanningWarehouseStock[],
  availabeMaterials: PlanningWarehouseStock[],
  pws1: PlanningWarehouseStock[],
  pws2: PlanningWarehouseStock[],
  pws3: PlanningWarehouseStock[]
) {
  //Ideas
  //-add missing Orders previous Waitinglist
  //-start with most used workstations
  //-start with most/least availabel material

  let calMaterial: PlanningWarehouseStock;
  let calMaterials1: PlanningWarehouseStock[] = [];
  let calMaterials2: PlanningWarehouseStock[] = [];
  let calMaterials3: PlanningWarehouseStock[] = [];
  let priorityOrder: PlanningWarehouseStock[] = [];
  let calMaterialsTotal: PlanningWarehouseStock[] = [];
  let finalProductionOrder: PlanningWarehouseStock[] = [];
  let perMaterials1: number = 0;
  let perMaterials2: number = 0;
  let perMaterials3: number = 0;
  let availabe: number;

  //planning least availabe Product - including Products used for all
  //set percentage of warehousestock and production order -> Prerequisit: production order equals the requiered amount

  //p1
  availabeMaterials.forEach((material) => {
    pws1.forEach((requiered) => {
      //calculate availabe material
      if (requiered.id.toString() === material.id.toString()) {
        if (requiered.amount !== 0) {
          availabe = material.amount / requiered.amount;
          //warehouse stock meets requirement fully
          if (availabe > 1) {
            availabe = 1;
            //warehouse stock not fully met
          }
          calMaterial = {
            id: requiered.id,
            amount: availabe,
          };
          //add to specific avalablility
          calMaterials1.push(calMaterial);
          //add to overall avalability
          perMaterials1 += availabe;
        }
        //nothing is required
        else {
        }
      }
    });
  });

  //p2
  availabeMaterials.forEach((material) => {
    pws2.forEach((requiered) => {
      //calculate availabe material
      if (requiered.id.toString() === material.id.toString()) {
        if (requiered.amount !== 0) {
          availabe = material.amount / requiered.amount;
          //warehouse stock meets requirement fully
          if (availabe > 1) {
            availabe = 1;
            //warehouse stock not fully met
          }
          calMaterial = {
            id: requiered.id,
            amount: availabe,
          };
          //add to specific avalablility
          calMaterials2.push(calMaterial);
          //add to overall avalability
          perMaterials2 += availabe;
        }
        //nothing is required
        else {
        }
      }
    });
  });

  //p3
  availabeMaterials.forEach((material) => {
    pws3.forEach((requiered) => {
      //calculate availabe material
      if (requiered.id.toString() === material.id.toString()) {
        if (requiered.amount !== 0) {
          availabe = material.amount / requiered.amount;
          //warehouse stock meets requirement fully
          if (availabe > 1) {
            availabe = 1;
            //warehouse stock not fully met
          }
          calMaterial = {
            id: requiered.id,
            amount: availabe,
          };
          //add to specific avalablility
          calMaterials3.push(calMaterial);
          //add to overall avalability
          perMaterials3 += availabe;
        }

        //nothing is required
        else {
        }
      }
    });
  });

  //calculate overall avalability
  perMaterials1 = perMaterials1 / calMaterials1.length;
  perMaterials2 = perMaterials2 / calMaterials2.length;
  perMaterials3 = perMaterials3 / calMaterials3.length;

  //set Order with average missing materials
  priorityOrder = [
    { id: 1, amount: perMaterials1 },
    { id: 2, amount: perMaterials2 },
    { id: 3, amount: perMaterials3 },
  ];

  priorityOrder.sort(function (a, b) {
    return a.amount - b.amount;
  });

  //set production order
  priorityOrder.forEach((element) => {
    switch (element.id) {
      case 1:
        calMaterialsTotal = calMaterialsTotal.concat(calMaterials1);
        break;
      case 2:
        calMaterialsTotal = calMaterialsTotal.concat(calMaterials2);
        break;
      case 3:
        calMaterialsTotal = calMaterialsTotal.concat(calMaterials3);
        break;
    }
  });

  //set new order
  let alreadySeen: number[] = [];
  let index;
  calMaterialsTotal.forEach((order) => {
    if (alreadySeen.includes(order.id)) {
      index = finalProductionOrder.findIndex(
        (element) => element.id === order.id
      );
      console.log(alreadySeen, order.id, index);
      finalProductionOrder[index].amount += order.amount;
    } else {
      alreadySeen.push(order.id);
      finalProductionOrder.push(order);
    }
  });

  //set new production
  productionOrders = [];
  productionOrders = finalProductionOrder;
  //console.log(productionOrders);
}

//Simulate
export function SimulateProduction() {}

//Evaluation
export function EvaluateResult() {
  //Count - Umrüstzeiten, Durchlaufzeiten
}

//__Produktion Planning

//Missung mutiused Halbfabrikate und Kaufteile

//Define Contraint with Dependency Mapping or Material Capacity
//constrain Material
//set already blocked timeslots from previous Period

//Loop at orders

//Check - Material availabe
//Check - next free Timeslot

//Change - PlanningWarehouseStock
//Change - Change Timeslot - Umrüstzeit
//Change - Change Timeslot - Durchlaufzeit

//Endloop

//Evaluating Solution

//Change Starting Point
//Splitt Production Order from Item with most Umrüstzeiten
