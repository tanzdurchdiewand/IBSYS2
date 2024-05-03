export type ProductionProgramm = {
  P1: ProductProduction;
  P2: ProductProduction;
  P3: ProductProduction;
};

export type ProductProduction = {
  salesOrder: SalesOrder;
  forecast: ProductionForecast[];
};

export type SalesOrder = {
  salesWish: number;
  productionWish: number;
};

export type ProductionForecast = {
  period: number;
  salesOrder: SalesOrder;
};

//Types for weekly planning of workstations
export type PlanningTimeslot = {
  id: number;
  productionOrder: number;
  start: number;
  end: number;
};

export type PlanningWorkstation = {
  id: number;
  timeslots: PlanningTimeslot[];
};

export type PlanningWarehouseStock = {
  id: string;
  amount: number;
};

export type ProductionPlan = {
  productionPlan: PlanningWarehouseStock[];
};
