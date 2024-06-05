export interface P1Planning {
  [key: string]: MaterialPlanningRow;
  p1: MaterialPlanningRow;
  e26p1: MaterialPlanningRow;
  e51: MaterialPlanningRow;
  e16p1: MaterialPlanningRow;
  e17p1: MaterialPlanningRow;
  e50: MaterialPlanningRow;
  e4: MaterialPlanningRow;
  e10: MaterialPlanningRow;
  e49: MaterialPlanningRow;
  e7: MaterialPlanningRow;
  e13: MaterialPlanningRow;
  e18: MaterialPlanningRow;
}

export interface P2Planning {
  [key: string]: MaterialPlanningRow;
  p2: MaterialPlanningRow;
  e26p2: MaterialPlanningRow;
  e56: MaterialPlanningRow;
  e16p2: MaterialPlanningRow;
  e17p2: MaterialPlanningRow;
  e55: MaterialPlanningRow;
  e5: MaterialPlanningRow;
  e11: MaterialPlanningRow;
  e54: MaterialPlanningRow;
  e8: MaterialPlanningRow;
  e14: MaterialPlanningRow;
  e19: MaterialPlanningRow;
}

export interface P3Planning {
  [key: string]: MaterialPlanningRow;
  p3: MaterialPlanningRow;
  e26p3: MaterialPlanningRow;
  e31: MaterialPlanningRow;
  e16p3: MaterialPlanningRow;
  e17p3: MaterialPlanningRow;
  e30: MaterialPlanningRow;
  e6: MaterialPlanningRow;
  e12: MaterialPlanningRow;
  e29: MaterialPlanningRow;
  e9: MaterialPlanningRow;
  e15: MaterialPlanningRow;
  e20: MaterialPlanningRow;
}

export interface Planning {
  P1: P1Planning;
  P2: P2Planning;
  P3: P3Planning;
  safetyStockMap: Map<string, string>;
}

export interface MaterialPlanningRow {
  productName: number;
  salesOrder: number;
  previousWaitingQueue: number;
  safetyStock: number;
  stock: number;
  waitingQueue: number;
  workInProgress: number;
  productionOrder: number;
}

type DependencyMapping = {
  [key: string]: string[];
};

export const dependencyMapping: DependencyMapping = {
  // P1
  "1": ["261", "51"],
  "51": ["161", "171", "50"],
  "50": ["4", "10", "49"],
  "49": ["7", "13", "18"],

  // P2
  "2": ["262", "56"],
  "56": ["162", "172", "55"],
  "55": ["5", "11", "54"],
  "54": ["8", "14", "19"],

  // P3
  "3": ["263", "31"],
  "31": ["163", "173", "30"],
  "30": ["6", "12", "29"],
  "29": ["9", "15", "20"],
};

export const updateOrdersMapping: DependencyMapping = {
  // P1
  "1": ["261", "51", "161", "171", "50", "4", "10", "49", "7", "13", "18"],
  "51": ["161", "171", "50", "4", "10", "49", "7", "13", "18"],
  "50": ["4", "10", "49", "7", "13", "18"],
  "49": ["7", "13", "18"],

  // P2
  "2": ["262", "56", "162", "172", "55", "5", "11", "54", "8", "14", "19"],
  "56": ["162", "172", "55", "5", "11", "54", "8", "14", "19"],
  "55": ["5", "11", "54", "8", "14", "19"],
  "54": ["8", "14", "19"],

  // P3
  "3": ["263", "31", "163", "173", "30", "6", "12", "29", "9", "15", "20"],
  "31": ["163", "173", "30", "6", "12", "29", "9", "15", "20"],
  "30": ["6", "12", "29", "9", "15", "20"],
  "29": ["9", "15", "20"],
};

export enum PlanningType {
  P1 = "P1",
  P2 = "P2",
  P3 = "P3",
}

export const planningConfig: Record<PlanningType, string[]> = {
  P1: [
    "P1",
    "E261",
    "E51",
    "E161",
    "E171",
    "E50",
    "E4",
    "E10",
    "E49",
    "E7",
    "E13",
    "E18",
  ],
  P2: [
    "P2",
    "E262",
    "E56",
    "E162",
    "E172",
    "E55",
    "E5",
    "E11",
    "E54",
    "E8",
    "E14",
    "E19",
  ],
  P3: [
    "P3",
    "E263",
    "E31",
    "E163",
    "E173",
    "E30",
    "E6",
    "E12",
    "E29",
    "E9",
    "E15",
    "E20",
  ],
};
