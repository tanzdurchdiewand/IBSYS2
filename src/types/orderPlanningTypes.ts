export interface MaterialOrderPlanning {
  [key: string]: OrderPlanningRow;
  k21: OrderPlanningRow;
  k22: OrderPlanningRow;
  k23: OrderPlanningRow;
  k24: OrderPlanningRow;
  k25: OrderPlanningRow;
  k27: OrderPlanningRow;
  k28: OrderPlanningRow;
  k32: OrderPlanningRow;
  k33: OrderPlanningRow;
  k34: OrderPlanningRow;
  k35: OrderPlanningRow;
  k36: OrderPlanningRow;
  k37: OrderPlanningRow;
  k38: OrderPlanningRow;
  k39: OrderPlanningRow;
  k40: OrderPlanningRow;
  k41: OrderPlanningRow;
  k42: OrderPlanningRow;
  k43: OrderPlanningRow;
  k44: OrderPlanningRow;
  k45: OrderPlanningRow;
  k46: OrderPlanningRow;
  k47: OrderPlanningRow;
  k48: OrderPlanningRow;
  k52: OrderPlanningRow;
  k53: OrderPlanningRow;
  k57: OrderPlanningRow;
  k58: OrderPlanningRow;
  k59: OrderPlanningRow;
}

export interface OrderPlanningRow {
  productName: number;
  deliveryTime: number;
  deviation: number;
  quantityP1: number;
  quantityP2: number;
  quantityP3: number;
  discountQuantity: number;
  warehouseStock: number;
  demandForPeriod: [number];
  orderQuantity: number;
  orderType: OrderType;
}

export enum OrderType {
  Fast,
  Normal,
}
