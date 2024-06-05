/* eslint-disable @typescript-eslint/no-unused-vars */
import { arrayBuffer } from "stream/consumers";
import { RootState, useDispatch, useSelector } from "../redux/store";
import { P1Planning } from "../types/materialPlanningTypes";
import ProductionPlanningTable from "./productionPlanningTable";
import { Container } from "@mui/material";
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
  WORKSTATION_SETUP_TIMES,
  PRODUCTION_SETUP_TIMES,
  DayTime,
  WarehouseStockChange,
  WarehouseStockChanges,
  ProductionTime,
} from "../types/productionPlanningTypes";
import {
  Article,
  GameData,
  WorkplaceOrdersInWork,
} from "../types/inputXMLTypes";
import { setProductionPlan } from "../redux/slices/productionPlanning";

export default function ProductionPlanning() {
  //Redux
  useSelector((state: RootState) => state.inputProductionProgramm.data);
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
  let finalProductionOrders: PlanningWarehouseStock[] = SetProductionOrder(
    productionOrders,
    availabeMaterials,
    p1,
    p2,
    p3
  );

  //Simulate
  //SimulateProduction(finalProductionOrders);
  let workstationData = SimulateProduction(
    finalProductionOrders,
    availabeMaterials
  );

  //Evaluation of results
  EvaluateResult();

  //change starting order

  //endloop

  //not optimzed
  //Missing overtimes
  data.productionPlan = productionOrders;

  //Redux save
  // dispatch(setProductionPlan(data));

  return (
    <Container style={{ marginTop: "120px" }}>
      <ProductionPlanningTable workstations={workstationData} />
    </Container>
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
      //finalProductionOrder[index].amount += order.amount;
    } else {
      alreadySeen.push(order.id);
      finalProductionOrder.push(order);
    }
    order.amount = 0;
  });

  //set new amounts
  finalProductionOrder.forEach((newOrder) => {
    productionOrders.forEach((oldOrder) => {
      if (newOrder.id === oldOrder.id) {
        newOrder.amount += oldOrder.amount;
      }
    });
  });

  //set final production order
  return finalProductionOrder;
}

//Simulation
export function SimulateProduction(
  finalProductionOrders: PlanningWarehouseStock[],
  availableMaterials: PlanningWarehouseStock[]
) {
  // Set Workstations
  const workstationCount = 15; // Anzahl der Workstations

  // Array zum Speichern aller Workstations
  const workstations: PlanningWorkstation[] = [];

  //missing parts order
  var missingPartsOrder: ProductionPlan;

  // Iteration über alle Workstations
  for (let i = 1; i <= workstationCount; i++) {
    const workstation: PlanningWorkstation = {
      workstation: i,
      maxTime: 2400, // Beispielwert, bitte anpassen
      availableTime: [],
      timeslots: [],
      productionTimes: Object.keys(PRODUCTION_SETUP_TIMES).map((itemName) => ({
        itemName,
        productionTime: PRODUCTION_SETUP_TIMES[itemName],
      })),
      productionSetupTime: WORKSTATION_SETUP_TIMES[i], // Setze die Einrichtungszeit für die entsprechende Workstation
    };

    // Füge available time hinzu
    let weekTime: WeekTime[] = [
      { day: 1, availableTime: workstation.maxTime },
      { day: 2, availableTime: workstation.maxTime },
      { day: 3, availableTime: workstation.maxTime },
      { day: 4, availableTime: workstation.maxTime },
      { day: 5, availableTime: workstation.maxTime },
    ];
    workstation.availableTime = weekTime;

    // Füge die erstellte Workstation dem Array hinzu
    workstations.push(workstation);
  }

  finalProductionOrders.forEach((element) => {
    //set lot sizes
    let amountProductionItems = element.amount / 10;
    //set start and endtime for orders wich are done at multiple workstations
    let dayTime: DayTime | undefined;
    //set last order for time calculation at setup times
    var lastOrder: number | undefined;
    var changeLog: WarehouseStockChange[] | undefined;

    //loop at for single lot size
 
    for (let i = 1; i <= amountProductionItems; i++) {
      //switch depending on material
      switch (element.id) {
        case 1:
        case 2:
        case 3:
          //Workstations wich are used
          // 4
          dayTime = SimulateProductionWorkstation(
            workstations[4],
            element,
            dayTime,
            undefined,
            availableMaterials,
            changeLog
          );
          break;
        case 4:
        case 5:
        case 6:
          // 10, 11
          dayTime = SimulateProductionWorkstation(
            workstations[10],
            element,
            dayTime,
            undefined,
            availableMaterials,
            changeLog
          );
          SimulateProductionWorkstation(
            workstations[11],
            element,
            dayTime,
            10,
            availableMaterials,
            changeLog
          );
          break;
        case 7:
        case 8:
        case 9:
          dayTime = SimulateProductionWorkstation(
            workstations[10],
            element,
            dayTime,
            undefined,
            availableMaterials,
            changeLog
          );
          SimulateProductionWorkstation(
            workstations[11],
            element,
            dayTime,
            10,
            availableMaterials,
            changeLog
          );
          break;
        case 10:
        case 11:
        case 12:
          // 13, 12, 8, 7, 9
          dayTime = SimulateProductionWorkstation(
            workstations[13],
            element,
            dayTime,
            undefined,
            availableMaterials,
            changeLog
          );
          dayTime = SimulateProductionWorkstation(
            workstations[12],
            element,
            dayTime,
            13,
            availableMaterials,
            changeLog
          );
          dayTime = SimulateProductionWorkstation(
            workstations[8],
            element,
            dayTime,
            12,
            availableMaterials,
            changeLog
          );
          dayTime = SimulateProductionWorkstation(
            workstations[7],
            element,
            dayTime,
            8,
            availableMaterials,
            changeLog
          );
          SimulateProductionWorkstation(
            workstations[9],
            element,
            dayTime,
            7,
            availableMaterials,
            changeLog
          );
          break;
        case 13:
        case 14:
        case 15:
          // 13, 12, 8, 7, 9
          dayTime = SimulateProductionWorkstation(
            workstations[13],
            element,
            dayTime,
            undefined,
            availableMaterials,
            changeLog
          );
          dayTime = SimulateProductionWorkstation(
            workstations[12],
            element,
            dayTime,
            13,
            availableMaterials,
            changeLog
          );
          dayTime = SimulateProductionWorkstation(
            workstations[8],
            element,
            dayTime,
            12,
            availableMaterials,
            changeLog
          );
          dayTime = SimulateProductionWorkstation(
            workstations[7],
            element,
            dayTime,
            8,
            availableMaterials,
            changeLog
          );
          SimulateProductionWorkstation(
            workstations[9],
            element,
            dayTime,
            7,
            availableMaterials,
            changeLog
          );
          break;
        case 16:
          // 6, 14
          dayTime = SimulateProductionWorkstation(
            workstations[6],
            element,
            dayTime,
            undefined,
            availableMaterials,
            changeLog
          );
          SimulateProductionWorkstation(
            workstations[14],
            element,
            dayTime,
            6,
            availableMaterials,
            changeLog
          );
          break;
        case 17:
          // 15
          dayTime = SimulateProductionWorkstation(
            workstations[15],
            element,
            dayTime,
            undefined,
            availableMaterials,
            changeLog
          );
          break;
        case 18:
        case 19:
        case 20:
          // 6, 8, 7, 9
          dayTime = SimulateProductionWorkstation(
            workstations[6],
            element,
            dayTime,
            undefined,
            availableMaterials,
            changeLog
          );
          dayTime = SimulateProductionWorkstation(
            workstations[8],
            element,
            dayTime,
            6,
            availableMaterials,
            changeLog
          );
          dayTime = SimulateProductionWorkstation(
            workstations[7],
            element,
            dayTime,
            8,
            availableMaterials,
            changeLog
          );
          dayTime = SimulateProductionWorkstation(
            workstations[9],
            element,
            dayTime,
            7,
            availableMaterials,
            changeLog
          );
          break;
        case 26:
          // 7, 15
          dayTime = SimulateProductionWorkstation(
            workstations[7],
            element,
            dayTime,
            undefined,
            availableMaterials,
            changeLog
          );
          SimulateProductionWorkstation(
            workstations[15],
            element,
            dayTime,
            7,
            availableMaterials,
            changeLog
          );
          break;
        case 49:
        case 54:
        case 29:
          // 1
          SimulateProductionWorkstation(
            workstations[1],
            element,
            dayTime,
            undefined,
            availableMaterials,
            changeLog
          );
          break;
        case 50:
        case 55:
        case 30:
          // 2
          SimulateProductionWorkstation(
            workstations[2],
            element,
            dayTime,
            undefined,
            availableMaterials,
            changeLog
          );
          break;
        case 51:
        case 56:
        case 31:
          // 3
          SimulateProductionWorkstation(
            workstations[3],
            element,
            dayTime,
            undefined,
            availableMaterials,
            changeLog
          );
          break;
      }
      //set lastOrder
      lastOrder = element.id;
    }
  });

  return workstations;
}

//add time to workstations
export function SimulateProductionWorkstation(
  workStation: PlanningWorkstation,
  order: PlanningWarehouseStock,
  dayTime: DayTime | undefined,
  lastOrder: number | undefined,
  availableMaterials: PlanningWarehouseStock[],
  changeLog: WarehouseStockChange[] | undefined
) {
  let timeslot: PlanningTimeslot;
  let requiredTime: number = 0;
  let startingTime: DayTime = { day: 1, time: 0 };

  // Produktionszeit für jeden Artikel in der Bestellung hinzufügen
  // Comment T: nicht ganz verstanden für was
  for (const item of workStation.productionTimes) {
    if (item.itemName.substring(1) === order.id.toString()) {
      requiredTime = item.productionTime * 10; //* order.amount;
      break;
    }
  }

  // Setup-Zeit für die Arbeitsstation hinzufügen - Comment T: falls benötigt wird
  if (order.id === lastOrder) {
    requiredTime += workStation.productionSetupTime;
  }

  // Set earliest time from previous workstation
  if (dayTime !== undefined) {
    startingTime = dayTime;
  }

  //sort timeslot
  workStation.timeslots.sort((a, b) => {
    if (a.day < b.day) return -1;
    if (a.day > b.day) return 1;
    if (a.start < b.start) return -1;
    if (a.start > b.start) return 1;
    return 0;
  });

  // Set earliest availabel time for current workstation
  workStation.timeslots.forEach((element) => {
    //new startime must be after or equal current startingTime
    if (startingTime.day >= element.day && startingTime.time >= element.end) {
      //check if there ist enough time between timeslots (between this entry in sorted array and in the next one)
      if (
        // does a next element exist
        (workStation.timeslots[workStation.timeslots.indexOf(element) + 1] ===
          undefined &&
          // does time go outside of the max time
          startingTime.time < workStation.maxTime) ||
        // is there enough time
        element.end -
          workStation.timeslots[workStation.timeslots.indexOf(element) + 1]
            ?.start >=
          requiredTime
      ) {
        // set new startingTime
        startingTime = { day: element.day, time: element.end };
      }
    }
  });

  //Check available Material
  //TODO: not the real required amount of materials
  const startingAmount = availableMaterials.find(
    (item) => Number(item.id) === Number(order.id)
  )?.amount;

  //starting amount
  let currentAmount: number;
  if (startingAmount !== undefined) {
    currentAmount = startingAmount;
  } else {
    currentAmount = 0;
  }

  //amount at time of planning
  if (changeLog !== undefined) {
    let materialChangeLog = changeLog.filter(
      (material) =>
        material.item === order.id &&
        material.day <= startingTime.day &&
        material.time <= startingTime.time
    );
    currentAmount -= materialChangeLog.reduce(
      (partialSum, a) => partialSum + a.item,
      0
    );
  }

  if (currentAmount > 0) {
    //set Timeslot
    timeslot = {
      productionOrder: order.id,
      day: startingTime.day,
      start: startingTime.time,
      end: startingTime.time + requiredTime,
    };

    //reduce available time
    workStation.availableTime.forEach((element) => {
      if (timeslot.day === element.day) {
        element.availableTime -= requiredTime;
      }
    });

    //add timeslot
    workStation.timeslots.push(timeslot);

    //add to changelog
    if (changeLog !== undefined) {
      let materialChangeLog = changeLog.filter(
        (material) =>
          material.item === order.id &&
          material.day <= startingTime.day &&
          material.time <= startingTime.time
      );
      currentAmount -= materialChangeLog.reduce(
        (partialSum, a) => partialSum + a.item,
        0
      );
    }

    //set new starting time for comming wortstation
    startingTime.time = timeslot.end;

    return startingTime;
  }
  //not available
  else {
    //TODO: What if not available?
  
  }
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
