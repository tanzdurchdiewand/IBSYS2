import {
  BikePartType,
  CapacityPlanningTable,
  SummaryTable,
  capacityPlanningData,
} from "../types/capacityPlanningTypes";
import { GameData } from "../types/inputXMLTypes";
import { ProductionProgramm } from "../types/productionPlanningTypes";

export function initializeCapacityPlanning(
  gameData: GameData,
  productionProgramm: ProductionProgramm
): CapacityPlanningTable {
  const capacityPlanning: CapacityPlanningTable = [];
  let count = 0;
  Object.entries(capacityPlanningData).forEach(([key, details]) => {
    const prodQuantity = getProductProductionQuantity(
      details.type,
      productionProgramm
    );

    capacityPlanning[count] = {
      designation: details.description,
      modelType: details.type,
      id: key,
      orderQuantity: prodQuantity,
      workstationResults: details.partsRequired.map(
        (num) => num * prodQuantity
      ),
    };

    count++;
  });

  console.log(capacityPlanning);

  return capacityPlanning;
}

export function initializeCapacityPlanningSummary(
  capacityPlanning: CapacityPlanningTable
): SummaryTable {
  //Object.entries(capacityPlanning).forEach(([key, details]) => {});

  return generateSummaryRows();
}

const getProductProductionQuantity = (
  type: BikePartType,
  productionProgramm: ProductionProgramm
): number => {
  switch (type) {
    case BikePartType.P1:
      return productionProgramm.P1.salesOrder.productionWish ?? 0;
    case BikePartType.P2:
      return productionProgramm.P2.salesOrder.productionWish ?? 0;
    case BikePartType.P3:
      return productionProgramm.P3.salesOrder.productionWish ?? 0;
    case BikePartType.P1_P2_P3:
      if (
        !productionProgramm.P1.salesOrder.productionWish ||
        !productionProgramm.P1.salesOrder.productionWish ||
        !productionProgramm.P1.salesOrder.productionWish
      ) {
        return 0;
      }

      return (
        Number(productionProgramm.P1.salesOrder.productionWish) +
        Number(productionProgramm.P2.salesOrder.productionWish) +
        Number(productionProgramm.P3.salesOrder.productionWish)
      );
    default:
      return 0;
  }
};

const generateSummaryRows = (): SummaryTable => {
  const data = [
    {
      label: "Kapazitätsbedarf",
      values: new Array(15)
        .fill(0)
        .map(() => Math.floor(Math.random() * 2000 + 1000)),
      editable: false,
    },
    {
      label: "Rüstzeit",
      values: new Array(15)
        .fill(0)
        .map(() => Math.floor(Math.random() * 100 + 50)),
      editable: false,
    },
    {
      label: "Gesamt-Kapazitätsbedarf",
      values: new Array(15)
        .fill(0)
        .map(() => Math.floor(Math.random() * 3000 + 1500)),
      editable: false,
    },
    {
      label: "Schichten und Überstunden",
      values: new Array(15)
        .fill(0)
        .map(() => Math.floor(Math.random() * 10 - 5)),
      editable: true,
    },
    {
      label: "Schichten und Überstunden pro Tag",
      values: new Array(15).fill(0).map(() => Math.floor(Math.random() * 3)),
      editable: true,
    },
  ];
  return data;
};
