import {
  BikePartType,
  CapacityPlanningTable,
  SummaryTable,
  capacityPlanningData,
} from "../types/capacityPlanningTypes";
import { ProductionProgramm, WORKSTATION_SETUP_TIMES } from "../types/productionPlanningTypes";

export function initializeCapacityPlanning(
  productionProgramm: ProductionProgramm
): CapacityPlanningTable {
  const capacityPlanning: CapacityPlanningTable = [];
  Object.entries(capacityPlanningData).forEach(([key, details], index) => {
    const prodQuantity = getProductProductionQuantity(
      details.type,
      productionProgramm
    );

    capacityPlanning[index] = {
      designation: details.description,
      modelType: details.type,
      id: key,
      orderQuantity: prodQuantity,
      workstationResults: details.capacityRequired.map(
        (num) => num * prodQuantity
      ),
    };
  });
  return capacityPlanning;
}

export function initializeCapacityPlanningSummary(
  capacityPlanning: CapacityPlanningTable,
  summaryTable: SummaryTable | null,
): SummaryTable {
  const generateArray = (): number[] => Array.from({ length: 15 }).map(() => 0);

  const MINUTES_PER_PERIOD = 2400;

  const shiftsAndOvertimes = generateArray();
  const shiftsAndOvertimePerDays = generateArray();
  const capacityRequirements = generateArray();
  const setupTimes = generateArray();
  const setupTimePreviousPeriods = generateArray();
  const totalCapacityRequirements = generateArray();

  // Berechne die Schichten und Überstunden basierend auf den Kapazitätsplanungsdaten
  Object.values(capacityPlanning).forEach(({ workstationResults }, workstationIndex) => {
    workstationResults.forEach((num, index) => {
      // Fülle die Kapazitätsanforderungen
      capacityRequirements[index] += num;

      // Berechne die Setup-Zeiten und Vorgängerperioden
      const setupTime = getSetupTime(workstationIndex + 1);
      setupTimes[workstationIndex] += setupTime;
      setupTimePreviousPeriods[workstationIndex] = 0;
    });
  });

  // Berechne Gesamtkapazitätsanforderungen und Überstunden
  for (let i = 0; i < capacityRequirements.length; i++) {
    totalCapacityRequirements[i] = capacityRequirements[i] + setupTimes[i] + setupTimePreviousPeriods[i];
    shiftsAndOvertimes[i] = Math.max(totalCapacityRequirements[i] - MINUTES_PER_PERIOD, 0); // Überstunden berechnen
    shiftsAndOvertimePerDays[i] = shiftsAndOvertimes[i] / 5; // Überstunden pro Tag berechnen
  }


  const capacitySummaryPlanning: SummaryTable = generateSummaryRows(
    capacityRequirements,
    setupTimes,
    setupTimePreviousPeriods,
    totalCapacityRequirements,
    shiftsAndOvertimes,
    shiftsAndOvertimePerDays
  );

  return capacitySummaryPlanning;

  function getSetupTime(workstationIndex: number): number {
    return WORKSTATION_SETUP_TIMES[workstationIndex] || 0;
  }
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

const generateSummaryRows = (
  capacityRequirements: number[],
  setupTimes: number[],
  setupTimePreviousPeriods: number[],
  totalCapacityRequirements: number[],
  shiftsAndOvertimes: number[],
  shiftsAndOvertimePerDays: number[]
): SummaryTable => {
  const data: SummaryTable = [
    {
      label: "Capacity Requirements",
      values: capacityRequirements,
      editable: false,
    },
    {
      label: "Setup Times",
      values: setupTimes,
      editable: false,
    },
    {
      label: "setupTimes Previous Periods",
      values: setupTimePreviousPeriods,
      editable: false,
    },
    {
      label: "Total Capacity Requirements",
      values: totalCapacityRequirements,
      editable: false,
    },
    {
      label: "Shifts And Overtimes",
      values: shiftsAndOvertimes,
      editable: true,
    },
    {
      label: "Shifts And Overtime Per Days",
      values: shiftsAndOvertimePerDays,
      editable: true,
    },
  ];
  return data;
};
