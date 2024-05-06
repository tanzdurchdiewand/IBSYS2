export interface CapacityPlanningRow {
  designation: string;
  modelType: string;
  id: string;
  orderQuantity: number;
  workstationResults: number[];
}

export type CapacityPlanningTable = CapacityPlanningRow[];

export interface SummaryRow {
  label: string;
  values: number[];
  editable: boolean;
}

export type SummaryTable = SummaryRow[];

export enum BikePartType {
  P1 = "P1",
  P2 = "P2",
  P3 = "P3",
  P1_P2_P3 = "P1/P2/P3",
}

type Article = {
  description: string;
  type: BikePartType;
  partsRequired: number[];
};

export interface ArticleMap {
  [key: string]: Article;
}

export const capacityPlanningData: ArticleMap = {
  E4: {
    description: "Hinterrad",
    type: BikePartType.P1,
    partsRequired: [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 3, 0, 0, 0, 0],
  },
  E5: {
    description: "Hinterrad",
    type: BikePartType.P2,
    partsRequired: [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 3, 0, 0, 0, 0],
  },
  E6: {
    description: "Hinterrad",
    type: BikePartType.P3,
    partsRequired: [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 3, 0, 0, 0, 0],
  },
  E7: {
    description: "Vorderrad",
    type: BikePartType.P1,
    partsRequired: [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 3, 0, 0, 0, 0],
  },
  E8: {
    description: "Vorderrad",
    type: BikePartType.P2,
    partsRequired: [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 3, 0, 0, 0, 0],
  },
  E9: {
    description: "Vorderrad",
    type: BikePartType.P3,
    partsRequired: [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 3, 0, 0, 0, 0],
  },
  E10: {
    description: "Schutzblech hinten",
    type: BikePartType.P1,
    partsRequired: [0, 0, 0, 0, 0, 0, 2, 1, 3, 0, 0, 3, 2, 0, 0],
  },
  E11: {
    description: "Schutzblech hinten",
    type: BikePartType.P2,
    partsRequired: [0, 0, 0, 0, 0, 0, 2, 1, 3, 0, 0, 3, 2, 0, 0],
  },
  E12: {
    description: "Schutzblech hinten",
    type: BikePartType.P3,
    partsRequired: [0, 0, 0, 0, 0, 0, 2, 1, 3, 0, 0, 3, 2, 0, 0],
  },
  E13: {
    description: "Schutzblech vorne",
    type: BikePartType.P1,
    partsRequired: [0, 0, 0, 0, 0, 0, 2, 1, 3, 0, 0, 3, 2, 0, 0],
  },
  E14: {
    description: "Schutzblech vorne",
    type: BikePartType.P2,
    partsRequired: [0, 0, 0, 0, 0, 0, 2, 1, 3, 0, 0, 3, 2, 0, 0],
  },
  E15: {
    description: "Schutzblech vorne",
    type: BikePartType.P3,
    partsRequired: [0, 0, 0, 0, 0, 0, 2, 1, 3, 0, 0, 3, 2, 0, 0],
  },
  E16: {
    description: "Lenker",
    type: BikePartType.P1_P2_P3,
    partsRequired: [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, 0],
  },
  E17: {
    description: "Sattel",
    type: BikePartType.P1_P2_P3,
    partsRequired: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  },
  E18: {
    description: "Rahmen",
    type: BikePartType.P1,
    partsRequired: [0, 0, 0, 0, 0, 3, 2, 3, 2, 0, 0, 0, 0, 0, 0],
  },
  E19: {
    description: "Rahmen",
    type: BikePartType.P2,
    partsRequired: [0, 0, 0, 0, 0, 3, 2, 3, 2, 0, 0, 0, 0, 0, 0],
  },
  E20: {
    description: "Rahmen",
    type: BikePartType.P3,
    partsRequired: [0, 0, 0, 0, 0, 3, 2, 3, 2, 0, 0, 0, 0, 0, 0],
  },
  E26: {
    description: "Pedale",
    type: BikePartType.P1_P2_P3,
    partsRequired: [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3],
  },
  E49: {
    description: "Vorderrad komplett",
    type: BikePartType.P1,
    partsRequired: [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  E54: {
    description: "Vorderrad komplett",
    type: BikePartType.P2,
    partsRequired: [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  E29: {
    description: "Vorderrad komplett",
    type: BikePartType.P3,
    partsRequired: [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  E50: {
    description: "Rahmen und Räder",
    type: BikePartType.P1,
    partsRequired: [0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  E55: {
    description: "Rahmen und Räder",
    type: BikePartType.P2,
    partsRequired: [0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  E30: {
    description: "Rahmen und Räder",
    type: BikePartType.P3,
    partsRequired: [0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  E51: {
    description: "Fahrrad ohne Pedale",
    type: BikePartType.P1,
    partsRequired: [0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  E56: {
    description: "Fahrrad ohne Pedale",
    type: BikePartType.P2,
    partsRequired: [0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  E31: {
    description: "Fahrrad ohne Pedale",
    type: BikePartType.P3,
    partsRequired: [0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  P1: {
    description: "Fahrrad komplett",
    type: BikePartType.P1,
    partsRequired: [0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  P2: {
    description: "Fahrrad komplett",
    type: BikePartType.P2,
    partsRequired: [0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  P3: {
    description: "Fahrrad komplett",
    type: BikePartType.P3,
    partsRequired: [0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
};
