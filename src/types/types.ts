// Types for the general forecast and warehouse stock sections
export type Forecast = {
  p1: number;
  p2: number;
  p3: number;
};

export type Article = {
  id: number;
  amount: number;
  startamount: number;
  pct: number;
  price: number;
  stockvalue: number;
};

export type WarehouseStock = {
  articles: Article[];
  totalStockValue: number;
};

// Types for the order sections
export type Order = {
  orderPeriod: number;
  id: number;
  mode: number;
  article?: number;
  amount?: number;
  time?: number;
  materialCosts?: number;
  orderCosts?: number;
  entireCosts?: number;
  pieceCosts?: number;
};

export type InwardStockMovement = {
  orders: Order[];
};

export type FutureInwardStockMovement = {
  orders: Order[];
};

// Types for workplace efficiency and idle time costs
export type Workplace = {
  id: number;
  setupevents: number;
  idletime: number;
  wageIdletimeCosts: number;
  wageCosts: number;
  machineIdletimeCosts: number;
};

export type IdletimeCosts = {
  workplaces: Workplace[];
  sum: {
    setupevents: number;
    idletime: number;
    wageIdletimeCosts: number;
    wageCosts: number;
    machineIdletimeCosts: number;
  };
};

// Types for workplace waiting lists and operations in work
export type Waitinglist = {
  period: number;
  order: number;
  firstbatch: number;
  lastbatch: number;
  item: number;
  amount: number;
  timeneed: number;
};

export type WaitinglistWorkstations = {
  workplaceId: number;
  timeNeed: number;
  waitingLists: Waitinglist[];
};

export type OrdersInWork = {
  workplaceId: number;
  period: number;
  order: number;
  batch: number;
  item: number;
  amount: number;
  timeNeed: number;
};

// Types for completed orders and cycle times
export type Batch = {
  id: number;
  amount: number;
  cycleTime: number;
  cost: number;
};

export type CompletedOrder = {
  period: number;
  id: number;
  item: number;
  quantity: number;
  cost: number;
  averageUnitCosts: number;
  batches: Batch[];
};

export type CycleTimes = {
  startedOrders: number;
  waitingOrders: number;
  orderDetails: {
    id: number;
    period: number;
    startTime: string;
    finishTime: string;
    cycleTimeMin: number;
    cycleTimeFactor: number;
  }[];
};

export type Data = {
  game: number;
  group: number;
  period: number;
  forecast: Forecast;
  warehouseStock: WarehouseStock;
  inwardStockMovement: InwardStockMovement;
  futureInwardStockMovement: FutureInwardStockMovement;
  idletimeCosts: IdletimeCosts;
  waitinglistWorkstations: WaitinglistWorkstations[];
  ordersInWork: OrdersInWork[];
  completedOrders: CompletedOrder[];
  cycleTimes: CycleTimes;
};

// A comprehensive type to encapsulate all data segments
export type GameData = {
  results: Data;
};
