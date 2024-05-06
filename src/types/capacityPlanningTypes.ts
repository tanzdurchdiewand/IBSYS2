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
