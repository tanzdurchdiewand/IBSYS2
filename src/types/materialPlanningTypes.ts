export interface P1Planning {
  [key: string]: MaterialPlanningRow;
  p1: MaterialPlanningRow;
  e26: MaterialPlanningRow;
  e51: MaterialPlanningRow;
  e16: MaterialPlanningRow;
  e17: MaterialPlanningRow;
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
  e26: MaterialPlanningRow;
  e56: MaterialPlanningRow;
  e16: MaterialPlanningRow;
  e17: MaterialPlanningRow;
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
  e26: MaterialPlanningRow;
  e31: MaterialPlanningRow;
  e16: MaterialPlanningRow;
  e17: MaterialPlanningRow;
  e30: MaterialPlanningRow;
  e6: MaterialPlanningRow;
  e12: MaterialPlanningRow;
  e29: MaterialPlanningRow;
  e9: MaterialPlanningRow;
  e15: MaterialPlanningRow;
  e20: MaterialPlanningRow;
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
  "1": ["26", "51"],
  "51": ["16", "17", "50"],
  "50": ["4", "10", "49"],
  "49": ["7", "13", "18"],
};
export const updateOrdersMapping: DependencyMapping = {
  "1": ["26", "51", "16", "17", "50", "4", "10", "49", "7", "13", "18"],
  "51": ["16", "17", "50", "4", "10", "49", "7", "13", "18"],
  "50": ["4", "10", "49", "7", "13", "18"],
  "49": ["7", "13", "18"],
};

export enum PlanningType {
  P1 = "p1",
  P2 = "p2",
  P3 = "p3",
}

export const planningConfig: Record<PlanningType, string[]> = {
  p1: [
    "P1",
    "E26",
    "E51",
    "E16",
    "E17",
    "E50",
    "E4",
    "E10",
    "E49",
    "E7",
    "E13",
    "E18",
  ],
  p2: [
    "P2",
    "E26",
    "E56",
    "E16",
    "E17",
    "E55",
    "E5",
    "E11",
    "E54",
    "E8",
    "E14",
    "E19",
  ],
  p3: [
    "P3",
    "E26",
    "E31",
    "E16",
    "E17",
    "E30",
    "E6",
    "E12",
    "E29",
    "E9",
    "E15",
    "E20",
  ],
};
