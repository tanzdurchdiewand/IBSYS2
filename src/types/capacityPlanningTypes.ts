import i18n from "../locals/i18n";

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
  capacityRequired: number[];
};

export interface ArticleMap {
  [key: string]: Article;
}

export const capacityPlanningData: ArticleMap = {
  E4: {
    description: `${i18n.t("capacityPlanning.backWheel")}`,
    type: BikePartType.P1,
    capacityRequired: [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 3, 0, 0, 0, 0],
  },
  E5: {
    description: `${i18n.t("capacityPlanning.backWheel")}`,
    type: BikePartType.P2,
    capacityRequired: [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 3, 0, 0, 0, 0],
  },
  E6: {
    description: `${i18n.t("capacityPlanning.backWheel")}`,
    type: BikePartType.P3,
    capacityRequired: [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 3, 0, 0, 0, 0],
  },
  E7: {
    description: `${i18n.t("capacityPlanning.frontWheel")}`,
    type: BikePartType.P1,
    capacityRequired: [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 3, 0, 0, 0, 0],
  },
  E8: {
    description: `${i18n.t("capacityPlanning.frontWheel")}`,
    type: BikePartType.P2,
    capacityRequired: [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 3, 0, 0, 0, 0],
  },
  E9: {
    description: `${i18n.t("capacityPlanning.frontWheel")}`,
    type: BikePartType.P3,
    capacityRequired: [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 3, 0, 0, 0, 0],
  },
  E10: {
    description: `${i18n.t("capacityPlanning.rearMudguard")}`,
    type: BikePartType.P1,
    capacityRequired: [0, 0, 0, 0, 0, 0, 2, 1, 3, 0, 0, 3, 2, 0, 0],
  },
  E11: {
    description: `${i18n.t("capacityPlanning.rearMudguard")}`,
    type: BikePartType.P2,
    capacityRequired: [0, 0, 0, 0, 0, 0, 2, 1, 3, 0, 0, 3, 2, 0, 0],
  },
  E12: {
    description: `${i18n.t("capacityPlanning.rearMudguard")}`,
    type: BikePartType.P3,
    capacityRequired: [0, 0, 0, 0, 0, 0, 2, 1, 3, 0, 0, 3, 2, 0, 0],
  },
  E13: {
    description: `${i18n.t("capacityPlanning.frontMudguard")}`,
    type: BikePartType.P1,
    capacityRequired: [0, 0, 0, 0, 0, 0, 2, 1, 3, 0, 0, 3, 2, 0, 0],
  },
  E14: {
    description: `${i18n.t("capacityPlanning.frontMudguard")}`,
    type: BikePartType.P2,
    capacityRequired: [0, 0, 0, 0, 0, 0, 2, 1, 3, 0, 0, 3, 2, 0, 0],
  },
  E15: {
    description: `${i18n.t("capacityPlanning.frontMudguard")}`,
    type: BikePartType.P3,
    capacityRequired: [0, 0, 0, 0, 0, 0, 2, 1, 3, 0, 0, 3, 2, 0, 0],
  },
  E16: {
    description: `${i18n.t("capacityPlanning.handlebar")}`,
    type: BikePartType.P1_P2_P3,
    capacityRequired: [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, 0],
  },
  E17: {
    description: `${i18n.t("capacityPlanning.seat")}`,
    type: BikePartType.P1_P2_P3,
    capacityRequired: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  },
  E18: {
    description: `${i18n.t("capacityPlanning.frame")}`,
    type: BikePartType.P1,
    capacityRequired: [0, 0, 0, 0, 0, 3, 2, 3, 2, 0, 0, 0, 0, 0, 0],
  },
  E19: {
    description: `${i18n.t("capacityPlanning.frame")}`,
    type: BikePartType.P2,
    capacityRequired: [0, 0, 0, 0, 0, 3, 2, 3, 2, 0, 0, 0, 0, 0, 0],
  },
  E20: {
    description: `${i18n.t("capacityPlanning.frame")}`,
    type: BikePartType.P3,
    capacityRequired: [0, 0, 0, 0, 0, 3, 2, 3, 2, 0, 0, 0, 0, 0, 0],
  },
  E26: {
    description: `${i18n.t("capacityPlanning.pedal")}`,
    type: BikePartType.P1_P2_P3,
    capacityRequired: [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3],
  },
  E49: {
    description: `${i18n.t("capacityPlanning.finishedFrontWheel")}`,
    type: BikePartType.P1,
    capacityRequired: [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  E54: {
    description: `${i18n.t("capacityPlanning.finishedFrontWheel")}`,
    type: BikePartType.P2,
    capacityRequired: [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  E29: {
    description: `${i18n.t("capacityPlanning.finishedFrontWheel")}`,
    type: BikePartType.P3,
    capacityRequired: [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  E50: {
    description: `${i18n.t("capacityPlanning.frameAndWheels")}`,
    type: BikePartType.P1,
    capacityRequired: [0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  E55: {
    description: `${i18n.t("capacityPlanning.frameAndWheels")}`,
    type: BikePartType.P2,
    capacityRequired: [0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  E30: {
    description: `${i18n.t("capacityPlanning.frameAndWheels")}`,
    type: BikePartType.P3,
    capacityRequired: [0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  E51: {
    description: `${i18n.t("capacityPlanning.bikeWithoutPedals")}`,
    type: BikePartType.P1,
    capacityRequired: [0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  E56: {
    description: `${i18n.t("capacityPlanning.bikeWithoutPedals")}`,
    type: BikePartType.P2,
    capacityRequired: [0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  E31: {
    description: `${i18n.t("capacityPlanning.bikeWithoutPedals")}`,
    type: BikePartType.P3,
    capacityRequired: [0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  P1: {
    description: `${i18n.t("capacityPlanning.completedBike")}`,
    type: BikePartType.P1,
    capacityRequired: [0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  P2: {
    description: `${i18n.t("capacityPlanning.completedBike")}`,
    type: BikePartType.P2,
    capacityRequired: [0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  P3: {
    description: `${i18n.t("capacityPlanning.completedBike")}`,
    type: BikePartType.P3,
    capacityRequired: [0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
};
