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
  WeekTime,
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
  //console.log(productionOrders);

  //get available Materials
  let availabeMaterials: PlanningWarehouseStock[] = SetAvailableMaterials();
  //console.log(availabeMaterials);

  //_loop
  //set starting order
  let finalProductionOrders: PlanningWarehouseStock[] = SetProductionOrder(
    productionOrders,
    availabeMaterials,
    p1,
    p2,
    p3
  );
  //console.log(productionOrders);

  //Simulate
  SimulateProduction(finalProductionOrders);

  //Evaluation of results
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

//set production order
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

  //Group by id for Material for all Products
  let alreadySeen: number[] = [];
  let index;
  calMaterialsTotal.forEach((order) => {
    if (alreadySeen.includes(order.id)) {
      index = finalProductionOrder.findIndex(
        (element) => element.id === order.id
      );
      finalProductionOrder[index].amount += order.amount;
    } else {
      alreadySeen.push(order.id);
      finalProductionOrder.push(order);
    }
  });

  //set final production order
  return finalProductionOrder;
}

//Simulation
export function SimulateProduction(
  finalProductionOrders: PlanningWarehouseStock[]
) {
  //worstation
  let workstation1: PlanningWorkstation = {
    workstation: 1,
    maxTime: 2400,
    availableTime: [],
    timeslots: [],
  };
  let workstation2: PlanningWorkstation = {
    workstation: 2,
    maxTime: 2400,
    availableTime: [],
    timeslots: [],
  };
  let workstation3: PlanningWorkstation = {
    workstation: 3,
    maxTime: 2400,
    availableTime: [],
    timeslots: [],
  };
  let workstation4: PlanningWorkstation = {
    workstation: 4,
    maxTime: 2400,
    availableTime: [],
    timeslots: [],
  };
  let workstation5: PlanningWorkstation = {
    workstation: 5,
    maxTime: 2400,
    availableTime: [],
    timeslots: [],
  };
  let workstation6: PlanningWorkstation = {
    workstation: 6,
    maxTime: 2400,
    availableTime: [],
    timeslots: [],
  };
  let workstation7: PlanningWorkstation = {
    workstation: 7,
    maxTime: 2400,
    availableTime: [],
    timeslots: [],
  };
  let workstation8: PlanningWorkstation = {
    workstation: 8,
    maxTime: 2400,
    availableTime: [],
    timeslots: [],
  };
  let workstation9: PlanningWorkstation = {
    workstation: 9,
    maxTime: 2400,
    availableTime: [],
    timeslots: [],
  };
  let workstation10: PlanningWorkstation = {
    workstation: 10,
    maxTime: 2400,
    availableTime: [],
    timeslots: [],
  };
  let workstation11: PlanningWorkstation = {
    workstation: 11,
    maxTime: 2400,
    availableTime: [],
    timeslots: [],
  };
  let workstation12: PlanningWorkstation = {
    workstation: 12,
    maxTime: 2400,
    availableTime: [],
    timeslots: [],
  };
  let workstation13: PlanningWorkstation = {
    workstation: 13,
    maxTime: 2400,
    availableTime: [],
    timeslots: [],
  };
  let workstation14: PlanningWorkstation = {
    workstation: 14,
    maxTime: 2400,
    availableTime: [],
    timeslots: [],
  };
  let workstation15: PlanningWorkstation = {
    workstation: 15,
    maxTime: 2400,
    availableTime: [],
    timeslots: [],
  };

  console.log(finalProductionOrders);

  finalProductionOrders.forEach((element) => {
    //needs to have date time
    let dateTime: number | undefined = undefined;

    //switch depending on material
    switch (element.id) {
      //
      case 1 | 2 | 3:
        //Workstations wich are used
        // 4
        //SimulateProductionWorkstation(workstation4, element);
        break;
      case 4 | 5 | 6:
        // 10, 11
        dateTime = SimulateProductionWorkstation(
          workstation10,
          element,
          dateTime
        );
        SimulateProductionWorkstation(workstation11, element, dateTime);
        break;
      case 7 | 8 | 9:
        // 10, 11
        break;
      case 10 | 11 | 12:
        // 13, 12, 8, 7, 9
        break;
      case 13 | 14 | 15:
        // 13, 12, 8, 7, 9
        break;
      case 16:
        // 6, 14
        break;
      case 17:
        // 15
        break;
      case 18 | 19 | 20:
        // 6, 8, 7, 9
        break;
      case 26:
        // 7, 15
        break;
      case 49 | 54 | 29:
        // 1
        break;
      case 50 | 55 | 30:
        // 2
        break;
      case 51 | 56 | 31:
        // 3
        break;
    }
  });
  console.log(workstation4);
  console.log(workstation10);
  console.log(workstation11);
}

//add time to workstations
export function SimulateProductionWorkstation(
  workStation: PlanningWorkstation,
  order: PlanningWarehouseStock,
  dateTime: number | undefined
) {
  //list of different mappings for time
  //get first available timeslot
  let timeslot: PlanningTimeslot;
  let timeslotLength = workStation.timeslots.length;

  //calculate time requirement
  let requiredTime = order.amount * 100;

  //first entry
  if (timeslotLength === 0) {
    let weekTime: WeekTime[] = [
      { day: 1, availableTime: workStation.maxTime },
      { day: 2, availableTime: workStation.maxTime },
      { day: 3, availableTime: workStation.maxTime },
      { day: 4, availableTime: workStation.maxTime },
      { day: 5, availableTime: workStation.maxTime },
    ];

    //set empty week
    workStation.availableTime = weekTime;
  }

  //next entry with last end as start

  //placeholder for testing
  let placeholdderTime: number;
  if (dateTime === undefined) {
    placeholdderTime = 0;
  } else {
    placeholdderTime = dateTime;
  }
  timeslot = {
    productionOrder: order.id,
    day: 1,
    start: placeholdderTime,
    end: placeholdderTime + requiredTime,
  };

  //reduce available time
  workStation.availableTime.forEach((element) => {
    if (timeslot.day === element.day) {
      element.availableTime -= requiredTime;
    }
  });

  //add timeslot
  workStation.timeslots.push(timeslot);

  return timeslot.end;
}

//evaluation and variation
export function EvaluateResult() {
  //Count - Umrüstzeiten, Durchlaufzeiten
  //Change Starting Point
  //Splitt Production Order from Item with most Umrüstzeiten
}

//Check - Material availabe
//Check - next free Timeslot

//Change - PlanningWarehouseStock
//Change - Change Timeslot - Umrüstzeit
//Change - Change Timeslot - Durchlaufzeit
