export type ProductionProgramm = {
  P1: ProductProduction;
  P2: ProductProduction;
  P3: ProductProduction;
  directSell: DirectSell;
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
  productionOrder: number;
  day: number;
  start: number;
  end: number;
};

export type WeekTime = {
  day: number;
  availableTime: number;
};

export type PlanningWorkstation = {
  workstation: number;
  maxTime: number;
  availableTime: WeekTime[];
  timeslots: PlanningTimeslot[];
};

export type PlanningWarehouseStock = {
  id: number;
  amount: number;
};

export type ProductionPlan = {
  productionPlan: PlanningWarehouseStock[];
};

export type DirectSell = {
  P1: DirectSellRow;
  P2: DirectSellRow;
  P3: DirectSellRow;
};

export type DirectSellRow = {
  amount: number;
  price: number;
  penalty: number;
};
