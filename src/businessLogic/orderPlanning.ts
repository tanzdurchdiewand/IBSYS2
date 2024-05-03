import { log } from "console";
import { GameData } from "../types/inputXMLTypes";
import {
  MaterialOrderPlanning,
  OrderPlanningRow,
  OrderType,
} from "../types/orderPlanningTypes";
import { ProductionProgramm } from "../types/productionPlanningTypes";

export function initializeOrderPlanning(
  gameData: GameData,
  productionProgramm: ProductionProgramm
): MaterialOrderPlanning {
  const orderPlanning: any = {};
  const products = gameData.results.warehousestock.article;

  console.log("initializeOrderPlanning", mockData);

  return mockData; //orderPlanning;
}

export function updateOrderRow(
  key: string,
  field: keyof OrderPlanningRow,
  value: number
): MaterialOrderPlanning {
  const orderPlanning: any = {};

  // TODO

  return mockData; //orderPlanning;
}

const mockData: MaterialOrderPlanning = {
  k21: {
    productName: 2101,
    deliveryTime: 5,
    deviation: 2,
    quantityP1: 50,
    quantityP2: 40,
    quantityP3: 30,
    discountQuantity: 5,
    warehouseStock: 150,
    demandForPeriod: [120, 100, 10, 12],
    orderQuantity: 130,
    orderType: OrderType.Normal,
  },
  k22: {
    productName: 2202,
    deliveryTime: 6,
    deviation: 1,
    quantityP1: 60,
    quantityP2: 50,
    quantityP3: 40,
    discountQuantity: 10,
    warehouseStock: 200,
    demandForPeriod: [150, 100, 100, 100],
    orderQuantity: 160,
    orderType: OrderType.Normal,
  },
  k23: {
    productName: 2303,
    deliveryTime: 7,
    deviation: 3,
    quantityP1: 55,
    quantityP2: 45,
    quantityP3: 35,
    discountQuantity: 8,
    warehouseStock: 190,
    demandForPeriod: [115, 112, 200, 111],
    orderQuantity: 123,
    orderType: OrderType.Normal,
  },
  k24: {
    productName: 2404,
    deliveryTime: 4,
    deviation: 4,
    quantityP1: 70,
    quantityP2: 60,
    quantityP3: 50,
    discountQuantity: 12,
    warehouseStock: 210,
    demandForPeriod: [130, 120, 120, 130],
    orderQuantity: 142,
    orderType: OrderType.Fast,
  },
  k25: {
    productName: 2505,
    deliveryTime: 9,
    deviation: 5,
    quantityP1: 90,
    quantityP2: 80,
    quantityP3: 70,
    discountQuantity: 15,
    warehouseStock: 230,
    demandForPeriod: [180, 80, 260, 20],
    orderQuantity: 195,
    orderType: OrderType.Normal,
  },
  k27: {
    productName: 2707,
    deliveryTime: 10,
    deviation: 6,
    quantityP1: 30,
    quantityP2: 20,
    quantityP3: 10,
    discountQuantity: 3,
    warehouseStock: 120,
    demandForPeriod: [45, 100, 40, 20],
    orderQuantity: 48,
    orderType: OrderType.Fast,
  },
  k28: {
    productName: 2808,
    deliveryTime: 11,
    deviation: 7,
    quantityP1: 40,
    quantityP2: 30,
    quantityP3: 25,
    discountQuantity: 5,
    warehouseStock: 140,
    demandForPeriod: [70, 102, 100, 10],
    orderQuantity: 75,
    orderType: OrderType.Normal,
  },
  k32: {
    productName: 3201,
    deliveryTime: 8,
    deviation: 2,
    quantityP1: 60,
    quantityP2: 40,
    quantityP3: 30,
    discountQuantity: 7,
    warehouseStock: 130,
    demandForPeriod: [100, 80, 90, 80],
    orderQuantity: 107,
    orderType: OrderType.Normal,
  },
  k33: {
    productName: 3302,
    deliveryTime: 7,
    deviation: 1,
    quantityP1: 65,
    quantityP2: 55,
    quantityP3: 45,
    discountQuantity: 11,
    warehouseStock: 110,
    demandForPeriod: [90, 88, 88, 88],
    orderQuantity: 101,
    orderType: OrderType.Normal,
  },
  k34: {
    productName: 3403,
    deliveryTime: 6,
    deviation: 3,
    quantityP1: 70,
    quantityP2: 60,
    quantityP3: 50,
    discountQuantity: 9,
    warehouseStock: 200,
    demandForPeriod: [180, 12, 111, 122],
    orderQuantity: 189,
    orderType: OrderType.Normal,
  },
  k35: {
    productName: 3504,
    deliveryTime: 5,
    deviation: 4,
    quantityP1: 75,
    quantityP2: 65,
    quantityP3: 55,
    discountQuantity: 13,
    warehouseStock: 220,
    demandForPeriod: [210, 111, 12, 130],
    orderQuantity: 223,
    orderType: OrderType.Normal,
  },
  k36: {
    productName: 3605,
    deliveryTime: 9,
    deviation: 5,
    quantityP1: 80,
    quantityP2: 70,
    quantityP3: 60,
    discountQuantity: 15,
    warehouseStock: 240,
    demandForPeriod: [210, 111, 12, 130],
    orderQuantity: 245,
    orderType: OrderType.Normal,
  },
  k37: {
    productName: 3706,
    deliveryTime: 10,
    deviation: 6,
    quantityP1: 85,
    quantityP2: 75,
    quantityP3: 65,
    discountQuantity: 17,
    warehouseStock: 260,
    demandForPeriod: [210, 111, 12, 130],
    orderQuantity: 267,
    orderType: OrderType.Normal,
  },
  k38: {
    productName: 3807,
    deliveryTime: 12,
    deviation: 7,
    quantityP1: 50,
    quantityP2: 40,
    quantityP3: 30,
    discountQuantity: 5,
    warehouseStock: 130,
    demandForPeriod: [210, 111, 12, 130],
    orderQuantity: 105,
    orderType: OrderType.Normal,
  },
  k39: {
    productName: 3908,
    deliveryTime: 8,
    deviation: 2,
    quantityP1: 45,
    quantityP2: 35,
    quantityP3: 25,
    discountQuantity: 3,
    warehouseStock: 100,
    demandForPeriod: [210, 111, 12, 130],
    orderQuantity: 78,
    orderType: OrderType.Normal,
  },
  k40: {
    productName: 4009,
    deliveryTime: 7,
    deviation: 1,
    quantityP1: 40,
    quantityP2: 30,
    quantityP3: 20,
    discountQuantity: 2,
    warehouseStock: 85,
    demandForPeriod: [210, 111, 12, 130],
    orderQuantity: 67,
    orderType: OrderType.Normal,
  },
  k41: {
    productName: 4100,
    deliveryTime: 6,
    deviation: 3,
    quantityP1: 55,
    quantityP2: 45,
    quantityP3: 35,
    discountQuantity: 8,
    warehouseStock: 110,
    demandForPeriod: [210, 111, 12, 130],
    orderQuantity: 98,
    orderType: OrderType.Normal,
  },
  k42: {
    productName: 4201,
    deliveryTime: 5,
    deviation: 4,
    quantityP1: 60,
    quantityP2: 50,
    quantityP3: 40,
    discountQuantity: 10,
    warehouseStock: 140,
    demandForPeriod: [210, 111, 12, 130],
    orderQuantity: 125,
    orderType: OrderType.Normal,
  },
  k43: {
    productName: 4302,
    deliveryTime: 9,
    deviation: 5,
    quantityP1: 65,
    quantityP2: 55,
    quantityP3: 45,
    discountQuantity: 12,
    warehouseStock: 170,
    demandForPeriod: [210, 111, 12, 130],
    orderQuantity: 152,
    orderType: OrderType.Normal,
  },
  k44: {
    productName: 4403,
    deliveryTime: 10,
    deviation: 6,
    quantityP1: 70,
    quantityP2: 60,
    quantityP3: 50,
    discountQuantity: 15,
    warehouseStock: 200,
    demandForPeriod: [210, 111, 12, 130],
    orderQuantity: 180,
    orderType: OrderType.Normal,
  },
  k45: {
    productName: 4504,
    deliveryTime: 11,
    deviation: 7,
    quantityP1: 75,
    quantityP2: 65,
    quantityP3: 55,
    discountQuantity: 17,
    warehouseStock: 230,
    demandForPeriod: [210, 111, 12, 130],
    orderQuantity: 208,
    orderType: OrderType.Normal,
  },
  k46: {
    productName: 4605,
    deliveryTime: 12,
    deviation: 2,
    quantityP1: 80,
    quantityP2: 70,
    quantityP3: 60,
    discountQuantity: 20,
    warehouseStock: 250,
    demandForPeriod: [210, 111, 12, 130],
    orderQuantity: 235,
    orderType: OrderType.Normal,
  },
  k47: {
    productName: 4706,
    deliveryTime: 8,
    deviation: 1,
    quantityP1: 85,
    quantityP2: 75,
    quantityP3: 65,
    discountQuantity: 22,
    warehouseStock: 270,
    demandForPeriod: [210, 111, 12, 130],
    orderQuantity: 262,
    orderType: OrderType.Normal,
  },
  k48: {
    productName: 4807,
    deliveryTime: 7,
    deviation: 3,
    quantityP1: 90,
    quantityP2: 80,
    quantityP3: 70,
    discountQuantity: 25,
    warehouseStock: 290,
    demandForPeriod: [210, 111, 12, 130],
    orderQuantity: 290,
    orderType: OrderType.Normal,
  },
  k52: {
    productName: 5208,
    deliveryTime: 6,
    deviation: 4,
    quantityP1: 95,
    quantityP2: 85,
    quantityP3: 75,
    discountQuantity: 27,
    warehouseStock: 310,
    demandForPeriod: [210, 111, 12, 130],
    orderQuantity: 312,
    orderType: OrderType.Normal,
  },
  k53: {
    productName: 5309,
    deliveryTime: 5,
    deviation: 5,
    quantityP1: 100,
    quantityP2: 90,
    quantityP3: 80,
    discountQuantity: 30,
    warehouseStock: 330,
    demandForPeriod: [210, 111, 12, 130],
    orderQuantity: 335,
    orderType: OrderType.Normal,
  },
  k57: {
    productName: 5701,
    deliveryTime: 4,
    deviation: 6,
    quantityP1: 105,
    quantityP2: 95,
    quantityP3: 85,
    discountQuantity: 32,
    warehouseStock: 350,
    demandForPeriod: [210, 111, 12, 130],
    orderQuantity: 358,
    orderType: OrderType.Fast,
  },
  k58: {
    productName: 5802,
    deliveryTime: 9,
    deviation: 7,
    quantityP1: 110,
    quantityP2: 100,
    quantityP3: 90,
    discountQuantity: 35,
    warehouseStock: 370,
    demandForPeriod: [210, 111, 12, 130],
    orderQuantity: 380,
    orderType: OrderType.Fast,
  },
  k59: {
    productName: 5903,
    deliveryTime: 8,
    deviation: 2,
    quantityP1: 115,
    quantityP2: 105,
    quantityP3: 95,
    discountQuantity: 38,
    warehouseStock: 390,
    demandForPeriod: [210, 111, 12, 130],
    orderQuantity: 403,
    orderType: OrderType.Normal,
  },
};
