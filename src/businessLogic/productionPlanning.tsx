/* eslint-disable @typescript-eslint/no-unused-vars */
import { RootState, useDispatch, useSelector } from "../redux/store";
import { Box, Button, Container, IconButton } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import i18n from "../locals/i18n";
import {
  useMaterialReactTable,
  MRT_Row,
  MRT_RowSelectionState,
} from "material-react-table";
import {
  PlanningWorkstation,
  PlanningWarehouseStock,
  ProductionPlan,
  WeekTime,
  WORKSTATION_SETUP_TIMES,
  PRODUCTION_SETUP_TIMES,
  ProductionPlanTimes,
  WorkstationTime,
  ProductionPlanTimesTotal,
} from "../types/productionPlanningTypes";
import { Article } from "../types/inputXMLTypes";
import { setProductionPlan } from "../redux/slices/productionPlanning";
import { MaterialReactTable } from "material-react-table";
export default function ProductionPlanning() {
  //Redux
  useSelector((state: RootState) => state.inputProductionProgramm.data);
  const dispatch = useDispatch();

  //workingarea
  let data: ProductionPlan = {
    productionPlan: [],
  };
  Object.defineProperty(data, "productionPlan", {
    writable: true,
  });

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

  //set starting order
  let finalProductionOrders: PlanningWarehouseStock[] = SetProductionOrder(
    productionOrders,
    availabeMaterials,
    p1,
    p2,
    p3
  );

  //Save data
  data.productionPlan = [...finalProductionOrders];

  //Simulate Produktion
  let production: ProductionPlanTimes[] = SimulateProduction(
    finalProductionOrders
  );

  //Generate Data for View in Table
  let productionPlanTimesTotal: ProductionPlanTimesTotal[] =
    GenerateProductionWithString(production);

  //Anzeige
  const columns = [
    {
      accessorKey: "id",
      header: i18n.t("productionPlanning.order"),
      grow: true,
      size: 100,
      enableEditing: false,
    },
    {
      accessorKey: "item",
      header: i18n.t("productionPlanning.item"),
      grow: true,
      size: 100,
      enableEditing: false,
    },
    {
      accessorKey: "amount",
      header: i18n.t("productionPlanning.amount"),
      grow: true,
      enableEditing: true,
    },
    {
      accessorKey: "workstationTimeAsString",
      header: i18n.t("productionPlanning.times"),
      grow: true,
      enableEditing: false,
    },
  ];

  const [productionResult, setData] = useState(() => productionPlanTimesTotal);
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  useEffect(() => {
    const productionPlan = {
      productionPlan: productionResult,
    };
    dispatch(setProductionPlan(productionPlan));
  }, [dispatch, productionResult]);

  //TODO: Editieren vom Amount Feld
  const table = useMaterialReactTable({
    columns,
    data: productionResult,
    enablePagination: false,
    enableRowNumbers: false,
    enableRowVirtualization: true,
    enableSorting: false,
    enableEditing: true,
    enableRowOrdering: true,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    editDisplayMode: "cell",
    muiEditTextFieldProps: ({ cell }) => ({
      onChange: (event) => {
        //set new values for data;
        const Property = Object.getOwnPropertyDescriptor(
          data.productionPlan[1],
          "amount"
        );
        console.log(Property);
        setDataOnFieldChange(
          Number(),
          cell.row._valuesCache.amount,
          data,
          productionOrders
        );
      },
    }),
    //optionally, use single-click to activate editing mode instead of default double-click
    muiTableBodyCellProps: ({ cell, column, table }) => ({
      onClick: () => {
        table.setEditingCell(cell); //set editing cell
        //optionally, focus the text field
        queueMicrotask(() => {
          const textField = table.refs.editInputRefs.current[column.id];
          if (textField) {
            textField.focus();
            textField.select?.();
          }
        });
      },
    }),
    //select row
    getRowId: (row) => row.id.toString(),
    muiTableBodyRowProps: ({ row }) => ({
      onClick: row.getToggleSelectedHandler(),
      sx: { cursor: "pointer" },
    }),
    positionToolbarAlertBanner: "bottom",
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
    //Drag and Drop implementation
    muiRowDragHandleProps: ({ table }) => ({
      onDragEnd: () => {
        const { draggingRow, hoveredRow } = table.getState();

        if (hoveredRow && draggingRow) {
          //set new order in productionResult
          if (hoveredRow.index !== undefined) {
            const idOld = productionResult[draggingRow.index].id;
            productionResult[draggingRow.index].id =
              productionResult[hoveredRow.index].id;
            productionResult[hoveredRow.index].id = idOld;
          }
          productionResult.splice(
            (hoveredRow as MRT_Row<ProductionPlanTimesTotal>).index,
            0,
            productionResult.splice(draggingRow.index, 1)[0]
          );
          setData([...productionResult]);
          // setProductionPlan([...productionResult]);
        }
      },
    }),
    //custom action buttons to top-left of top toolbar
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: "flex", gap: "4px", p: "4px" }}>
        <Button
          color="secondary"
          onClick={() => {
            let splitId = Object.keys(rowSelection);
            let rowData: ProductionPlanTimesTotal[] = splitOrder(
              splitId,
              productionResult
            );
            setData(rowData);
          }}
          variant="contained"
        >
          {i18n.t("productionPlanning.splitOrder")}
        </Button>
      </Box>
    ),
  });

  //write table to redux store
  dispatch(setProductionPlan(data));

  return <MaterialReactTable table={table} />;
}

//set total production orders
export function SetProductionGoals(
  pws1: PlanningWarehouseStock[],
  pws2: PlanningWarehouseStock[],
  pws3: PlanningWarehouseStock[]
) {
  //structure/table
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
  finalProductionOrders: PlanningWarehouseStock[]
) {
  // Set Workstations
  const workstationCount = 15; // Anzahl der Workstations

  // Array zum Speichern aller Workstations
  const workstations: PlanningWorkstation[] = [];

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

  // Times for Produktion at a Worksattion
  let production: ProductionPlanTimes[] = [];
  let count = 0;

  finalProductionOrders.forEach((element) => {
    // set new values
    count += 1;
    let workstationTime: WorkstationTime;

    let productionItem: ProductionPlanTimes = {
      id: count,
      item: element.id,
      amount: element.amount,
      workstationTime: [],
    };

    //set last order for time calculation at setup times
    var lastOrder: number | undefined;

    //switch depending on material
    switch (element.id) {
      case 1:
      case 2:
      case 3:
        //Workstations wich are used
        // 4
        workstationTime = CalculateProductionTime(
          workstations[4 - 1],
          element,
          lastOrder
        );
        productionItem.workstationTime.push(workstationTime);
        break;
      case 4:
      case 5:
      case 6:
        // 10, 11
        workstationTime = CalculateProductionTime(
          workstations[10 - 1],
          element,
          lastOrder
        );
        productionItem.workstationTime.push(workstationTime);
        workstationTime = CalculateProductionTime(
          workstations[11 - 1],
          element,
          lastOrder
        );
        productionItem.workstationTime.push(workstationTime);
        break;
      case 7:
      case 8:
      case 9:
        workstationTime = CalculateProductionTime(
          workstations[10 - 1],
          element,
          lastOrder
        );
        productionItem.workstationTime.push(workstationTime);
        workstationTime = CalculateProductionTime(
          workstations[11 - 1],
          element,
          lastOrder
        );
        productionItem.workstationTime.push(workstationTime);
        break;
      case 10:
      case 11:
      case 12:
        // 13, 12, 8, 7, 9
        workstationTime = CalculateProductionTime(
          workstations[13 - 1],
          element,
          lastOrder
        );
        productionItem.workstationTime.push(workstationTime);
        workstationTime = CalculateProductionTime(
          workstations[12 - 1],
          element,
          lastOrder
        );
        productionItem.workstationTime.push(workstationTime);
        workstationTime = CalculateProductionTime(
          workstations[8 - 1],
          element,
          lastOrder
        );
        productionItem.workstationTime.push(workstationTime);
        workstationTime = CalculateProductionTime(
          workstations[7 - 1],
          element,
          lastOrder
        );
        productionItem.workstationTime.push(workstationTime);
        workstationTime = CalculateProductionTime(
          workstations[9 - 1],
          element,
          lastOrder
        );
        productionItem.workstationTime.push(workstationTime);
        break;
      case 13:
      case 14:
      case 15:
        // 13, 12, 8, 7, 9
        workstationTime = CalculateProductionTime(
          workstations[13 - 1],
          element,
          lastOrder
        );
        productionItem.workstationTime.push(workstationTime);
        workstationTime = CalculateProductionTime(
          workstations[12 - 1],
          element,
          lastOrder
        );
        productionItem.workstationTime.push(workstationTime);
        workstationTime = CalculateProductionTime(
          workstations[8 - 1],
          element,
          lastOrder
        );
        productionItem.workstationTime.push(workstationTime);
        workstationTime = CalculateProductionTime(
          workstations[7 - 1],
          element,
          lastOrder
        );
        productionItem.workstationTime.push(workstationTime);
        workstationTime = CalculateProductionTime(
          workstations[9 - 1],
          element,
          lastOrder
        );
        productionItem.workstationTime.push(workstationTime);
        break;
      case 16:
        // 6, 14
        workstationTime = CalculateProductionTime(
          workstations[6 - 1],
          element,
          lastOrder
        );
        productionItem.workstationTime.push(workstationTime);
        workstationTime = CalculateProductionTime(
          workstations[14 - 1],
          element,
          lastOrder
        );
        productionItem.workstationTime.push(workstationTime);
        break;
      case 17:
        // 15
        workstationTime = CalculateProductionTime(
          workstations[15 - 1],
          element,
          lastOrder
        );
        productionItem.workstationTime.push(workstationTime);
        break;
      case 18:
      case 19:
      case 20:
        // 6, 8, 7, 9
        workstationTime = CalculateProductionTime(
          workstations[6 - 1],
          element,
          lastOrder
        );
        productionItem.workstationTime.push(workstationTime);
        workstationTime = CalculateProductionTime(
          workstations[8 - 1],
          element,
          lastOrder
        );
        productionItem.workstationTime.push(workstationTime);
        workstationTime = CalculateProductionTime(
          workstations[7 - 1],
          element,
          lastOrder
        );
        productionItem.workstationTime.push(workstationTime);
        workstationTime = CalculateProductionTime(
          workstations[9 - 1],
          element,
          lastOrder
        );
        productionItem.workstationTime.push(workstationTime);
        break;
      case 26:
        // 7, 15
        workstationTime = CalculateProductionTime(
          workstations[7 - 1],
          element,
          lastOrder
        );
        productionItem.workstationTime.push(workstationTime);
        workstationTime = CalculateProductionTime(
          workstations[15 - 1],
          element,
          lastOrder
        );
        productionItem.workstationTime.push(workstationTime);
        break;
      case 49:
      case 54:
      case 29:
        // 1
        workstationTime = CalculateProductionTime(
          workstations[1 - 1],
          element,
          lastOrder
        );
        productionItem.workstationTime.push(workstationTime);
        break;
      case 50:
      case 55:
      case 30:
        // 2
        workstationTime = CalculateProductionTime(
          workstations[2 - 1],
          element,
          lastOrder
        );
        productionItem.workstationTime.push(workstationTime);
        break;
      case 51:
      case 56:
      case 31:
        // 3
        workstationTime = CalculateProductionTime(
          workstations[3 - 1],
          element,
          lastOrder
        );
        productionItem.workstationTime.push(workstationTime);
        break;
    }
    //set lastOrder
    lastOrder = element.id;

    //add productionItem to production
    production.push(productionItem);
  });
  return production;
}

//add time to workstations
export function CalculateProductionTime(
  workStation: PlanningWorkstation,
  order: PlanningWarehouseStock,
  lastOrder: number | undefined
) {
  let requiredTime: number = 0;
  let workstationTime: WorkstationTime;

  //TODO: Nicht korrekte Zeiten
  // Produktionszeit für jeden Artikel in der Bestellung hinzufügen
  for (const item of workStation.productionTimes) {
    if (item.itemName.substring(1) === order.id.toString()) {
      requiredTime += item.productionTime * order.amount;
      break;
    }
  }

  workstationTime = {
    workstation: workStation.workstation,
    productionTime: requiredTime,
    setupTime: 0,
  };

  // Setup-Zeit für die Arbeitsstation hinzufügen, falls benötigt wird
  if (order.id !== lastOrder) {
    //requiredTime += workStation.productionSetupTime;
    workstationTime.setupTime = workStation.productionSetupTime;
  }
  lastOrder = order.id;

  return workstationTime;
}

//set data for display
export function GenerateProductionWithString(
  production: ProductionPlanTimes[]
) {
  let productionPlanTimesTotal: ProductionPlanTimesTotal[] = [];

  //generate string for Table
  production.forEach((element) => {
    let description = "";

    element.workstationTime.forEach((item) => {
      description += `${item.workstation}:${item.productionTime},${item.setupTime};`;
    });

    let productionPlanTimesTotalItem: ProductionPlanTimesTotal = {
      id: element.id,
      item: element.item,
      amount: element.amount,
      workstationTimeAsString: description,
    };

    productionPlanTimesTotal.push(productionPlanTimesTotalItem);
  });
  return productionPlanTimesTotal;
}

export function splitOrder(
  splitId: string[],
  oldProductionPlan: ProductionPlanTimesTotal[]
) {
  const old = [...oldProductionPlan];
  const split = [...splitId];
  let newOrderItem: PlanningWarehouseStock;
  let newOrder: PlanningWarehouseStock[] = [];
  let newProductionPlan: ProductionPlanTimesTotal[];

  //let count: number = 0;
  let found: boolean = false;

  //Create new Order
  old.forEach((production) => {
    found = false;
    for (let item of split) {
      if (item === production.id.toString()) {
        found = true;
        let startAmount = production.amount;
        let halfAmount = Math.round(startAmount / 2);
        let leftAmount = startAmount - halfAmount;

        newOrderItem = { id: production.item, amount: halfAmount };
        newOrder.push(newOrderItem);

        newOrderItem = { id: production.item, amount: leftAmount };
        newOrder.push(newOrderItem);
        break;
      }
    }
    //
    if (!found) {
      newOrderItem = { id: production.item, amount: production.amount };
      newOrder.push(newOrderItem);
    }
  });

  console.log(newOrder);

  //Create new List
  let production: ProductionPlanTimes[] = SimulateProduction(newOrder);
  newProductionPlan = GenerateProductionWithString(production);

  return newProductionPlan;
}

export function setDataOnFieldChange(
  index: number,
  newValue: number,
  data: ProductionPlan,
  productionOrders: PlanningWarehouseStock[]
) {
  //set new value
  //data.productionPlan[index].amount = newValue;

  //Check correct values for current Change
  let item = data.productionPlan[index].id;
  let sum = 0;
  let total = productionOrders.find((element) => (element.id = item));

  data.productionPlan.forEach(function (order, i) {
    if (order.id === item) {
      sum += order.amount;
    }
  });

  console.log(sum, total);
}
