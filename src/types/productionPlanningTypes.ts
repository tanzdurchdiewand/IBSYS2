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
  productionTimes: ProductionTime[];
  productionSetupTime: number;
};

export type ProductionTime = {
  itemName: string;
  productionTime: number;
};

export type PlanningWarehouseStock = {
  id: number;
  amount: number;
};

export type ProductionPlan = {
  productionPlan: PlanningWarehouseStock[];
};

export type WarehouseStockChange = {
  item: number;
  day: number;
  time: number;
  amount: number;
}

export type WarehouseStockChanges = {
  changes: WarehouseStockChange [];
};

export type DayTime = {
  day: number;
  time: number;
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

export const PRODUCTION_SETUP_TIMES: Record<string, number> = {
  "e49": 6,
  "e54": 6,
  "e29": 6,
  "e50": 5,
  "e55": 5,
  "e30": 5,
  "e51": 5,
  "e56": 6,
  "e31": 6,
  "p1": 6,
  "p2": 7,
  "p3": 7,
  "e16": 2,
  "e18": 3,
  "e19": 3,
  "e20": 3,
  "e10": 2,
  "e11": 2,
  "e12": 2,
  "e13": 2,
  "e14": 2,
  "e15": 2,
  "e26": 2,
  "e4": 4,
  "e5": 4,
  "e6": 4,
  "e7": 4,
  "e8": 4,
  "e9": 4,
  "e17": 3,
};

export const WORKSTATION_SETUP_TIMES: Record<number, number> = {
  1: 20,
  2: 30,
  3: 20,
  4: 30,
  5: 0,
  6: 15,
  7: 20,
  8: 20,
  9: 15,
  10: 20,
  11: 20,
  12: 0,
  13: 0,
  14: 0,
  15: 15,
};

