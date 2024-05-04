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
  demandForPeriod: [number, number, number, number];
  orderQuantity: number;
  orderType: OrderType;
}

export enum OrderType {
  Normal,
  Fast,
}


interface OrderDetails {
  deliveryTime: number;
  deviation: number;
  requiredQuantityP1: number;
  requiredQuantityP2: number;
  requiredQuantityP3: number;
  discountQuantity: number;
}

export interface OrderDetailsMap {
  [key: string]: OrderDetails;
}

export const orderDetail: OrderDetailsMap = {
  "21": { deliveryTime: 1.8, deviation: 0.4, requiredQuantityP1: 1, requiredQuantityP2: 0, requiredQuantityP3: 0, discountQuantity: 300 },
  "22": { deliveryTime: 1.7, deviation: 0.4, requiredQuantityP1: 0, requiredQuantityP2: 1, requiredQuantityP3: 0, discountQuantity: 300 },
  "23": { deliveryTime: 1.2, deviation: 0.2, requiredQuantityP1: 0, requiredQuantityP2: 0, requiredQuantityP3: 1, discountQuantity: 300 },
  "24": { deliveryTime: 3.2, deviation: 0.3, requiredQuantityP1: 7, requiredQuantityP2: 7, requiredQuantityP3: 7, discountQuantity: 6100 },
  "25": { deliveryTime: 0.9, deviation: 0.2, requiredQuantityP1: 4, requiredQuantityP2: 4, requiredQuantityP3: 4, discountQuantity: 3600 },
  "27": { deliveryTime: 0.9, deviation: 0.2, requiredQuantityP1: 2, requiredQuantityP2: 2, requiredQuantityP3: 2, discountQuantity: 1800 },
  "28": { deliveryTime: 1.7, deviation: 0.4, requiredQuantityP1: 4, requiredQuantityP2: 5, requiredQuantityP3: 6, discountQuantity: 4500 },
  "32": { deliveryTime: 2.1, deviation: 0.5, requiredQuantityP1: 3, requiredQuantityP2: 3, requiredQuantityP3: 3, discountQuantity: 2700 },
  "33": { deliveryTime: 1.9, deviation: 0.5, requiredQuantityP1: 0, requiredQuantityP2: 0, requiredQuantityP3: 2, discountQuantity: 900 },
  "34": { deliveryTime: 1.6, deviation: 0.3, requiredQuantityP1: 0, requiredQuantityP2: 0, requiredQuantityP3: 72, discountQuantity: 22000 },
  "35": { deliveryTime: 2.2, deviation: 0.4, requiredQuantityP1: 4, requiredQuantityP2: 4, requiredQuantityP3: 4, discountQuantity: 3600 },
  "36": { deliveryTime: 1.2, deviation: 0.1, requiredQuantityP1: 1, requiredQuantityP2: 1, requiredQuantityP3: 1, discountQuantity: 900 },
  "37": { deliveryTime: 1.5, deviation: 0.3, requiredQuantityP1: 1, requiredQuantityP2: 1, requiredQuantityP3: 1, discountQuantity: 900 },
  "38": { deliveryTime: 1.7, deviation: 0.4, requiredQuantityP1: 1, requiredQuantityP2: 1, requiredQuantityP3: 1, discountQuantity: 300 },
  "39": { deliveryTime: 1.5, deviation: 0.3, requiredQuantityP1: 2, requiredQuantityP2: 2, requiredQuantityP3: 2, discountQuantity: 1800 },
  "40": { deliveryTime: 1.7, deviation: 0.2, requiredQuantityP1: 1, requiredQuantityP2: 1, requiredQuantityP3: 1, discountQuantity: 900 },
  "41": { deliveryTime: 0.9, deviation: 0.2, requiredQuantityP1: 1, requiredQuantityP2: 1, requiredQuantityP3: 1, discountQuantity: 900 },
  "42": { deliveryTime: 1.2, deviation: 0.3, requiredQuantityP1: 2, requiredQuantityP2: 2, requiredQuantityP3: 2, discountQuantity: 1800 },
  "43": { deliveryTime: 2.0, deviation: 0.5, requiredQuantityP1: 1, requiredQuantityP2: 1, requiredQuantityP3: 1, discountQuantity: 2700 },
  "44": { deliveryTime: 1.0, deviation: 0.2, requiredQuantityP1: 3, requiredQuantityP2: 3, requiredQuantityP3: 3, discountQuantity: 900 },
  "45": { deliveryTime: 1.7, deviation: 0.3, requiredQuantityP1: 1, requiredQuantityP2: 1, requiredQuantityP3: 1, discountQuantity: 900 },
  "46": { deliveryTime: 0.9, deviation: 0.3, requiredQuantityP1: 1, requiredQuantityP2: 1, requiredQuantityP3: 1, discountQuantity: 900 },
  "47": { deliveryTime: 1.1, deviation: 0.1, requiredQuantityP1: 1, requiredQuantityP2: 1, requiredQuantityP3: 1, discountQuantity: 900 },
  "48": { deliveryTime: 1.0, deviation: 0.2, requiredQuantityP1: 2, requiredQuantityP2: 2, requiredQuantityP3: 2, discountQuantity: 1800 },
  "52": { deliveryTime: 1.6, deviation: 0.4, requiredQuantityP1: 2, requiredQuantityP2: 0, requiredQuantityP3: 0, discountQuantity: 600 },
  "53": { deliveryTime: 1.6, deviation: 0.2, requiredQuantityP1: 72, requiredQuantityP2: 0, requiredQuantityP3: 0, discountQuantity: 22000 },
  "57": { deliveryTime: 1.7, deviation: 0.3, requiredQuantityP1: 0, requiredQuantityP2: 2, requiredQuantityP3: 0, discountQuantity: 600 },
  "58": { deliveryTime: 1.6, deviation: 0.5, requiredQuantityP1: 0, requiredQuantityP2: 72, requiredQuantityP3: 0, discountQuantity: 22000 },
  "59": { deliveryTime: 0.7, deviation: 0.2, requiredQuantityP1: 2, requiredQuantityP2: 2, requiredQuantityP3: 2, discountQuantity: 1800 }
};