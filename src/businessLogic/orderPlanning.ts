import { log } from "console";
import { GameData } from "../types/inputXMLTypes";
import {
  MaterialOrderPlanning,
  OrderPlanningRow,
  OrderType,
  orderDetail,
} from "../types/orderPlanningTypes";
import { ProductionProgramm } from "../types/productionPlanningTypes";

// TODO
//<inwardstockmovement>
//<futureinwardstockmovement>

// Fast wie viel schnelle?

// Production Programm(PP)  x = periode  K = kaufteil
//Demand for Period x = (PPx P1 * KquantityP1) + (PPx P2 * KquantityP1) + (PPx P3 * KquantityP1)

// Lieferdauer in Perioden = (Lieferfrist + Abweichung)
// Bedarf 4 Perioden = Demand for Period x + Demand for Period x1 + Demand for Period x2 + Demand for Period x3
// Bedarf bis nächste Lieferung = if (1 <= Lieferdauer) { Demand for Period x } else if (2  <= Lieferdauer) { Demand for Period x + Demand for Period x1}
// OrderType = (Anfangsbestand - Bedarf bis nächste Lieferung) < 0? Fast : Normal;
// Bestellmenge: Economic order quantity EOQ model
/*
Data Example:
  demands: [250, 300, 275, 325, 350], // Demands for consecutive periods
  orderCostPerOrder: 50, 
  unitCost: 20,
  holdingCostRate: 0.025, //Lagerkostensatz
  deliveryTime: 3,
  safetyStockFactor: 1.65, // Corresponds to about a 95% service level
  demandStdDev: 30 // Standard deviation of demand

interface InventoryParameters {
  demands: number[]; // Array of demands for each period
  orderCostPerOrder: number; // k_B
  unitCost: number; // w
  holdingCostRate: number; // i
  deliveryTime: number; // Number of periods it takes for an order to arrive
  safetyStockFactor: number; // z
  demandStdDev: number; // Standard deviation of demand
}

export function calculateDynamicOrderQuantity(params: InventoryParameters): number {
  const { demands, orderCostPerOrder, unitCost, holdingCostRate, deliveryTime, safetyStockFactor, demandStdDev } = params;

  const totalDemand = demands.slice(0, deliveryTime).reduce((acc, demand) => acc + demand, 0);
  const safetyStock = safetyStockFactor * demandStdDev * Math.sqrt(deliveryTime);
  const totalRequirement = totalDemand + safetyStock;

  const numerator = 2 * totalRequirement * orderCostPerOrder;
  const denominator = unitCost * holdingCostRate;
  const optimalOrderQuantity = Math.sqrt(numerator / denominator);

  return optimalOrderQuantity;
}
*/

export function initializeOrderPlanning(
  gameData: GameData,
  productionProgramm: ProductionProgramm
): MaterialOrderPlanning {
  const orderPlanning: any = {};
  const pendingOrders = gameData.results.futureinwardstockmovement.order;

  Object.entries(orderDetail).forEach(([key, details]) => {
    const warehouseStock = returnWarehouseStockForProduct(gameData, key);

    const demands = calculateDemands(
      productionProgramm,
      details.requiredQuantityP1,
      details.requiredQuantityP2,
      details.requiredQuantityP3
    );

    const filteredOrders =
      pendingOrders.find((order) => order.article!.toString() === key) ?? null;
    const pendingOrderPeriod = filteredOrders?.orderperiod ?? 0;
    const pendingOrderAmount = filteredOrders?.amount ?? 0;

    // TODO calculate orderQuantity and orderType
    const orderQuantity = 0;
    const orderType = OrderType.Normal;

    orderPlanning[key] = {
      productName: key,
      deliveryTime: details.deliveryTime,
      deviation: details.deviation,
      quantityP1: details.requiredQuantityP1,
      quantityP2: details.requiredQuantityP2,
      quantityP3: details.requiredQuantityP3,
      discountQuantity: details.discountQuantity,
      warehouseStock: warehouseStock,
      demandForPeriod: demands,
      orderQuantity: orderQuantity,
      orderType: orderType,
      pendingOrderPeriod: pendingOrderPeriod,
      pendingOrderAmount: pendingOrderAmount,
    };
  });

  return orderPlanning;
}

export function updateOrderRow(
  currentData: MaterialOrderPlanning,
  key: string,
  field: keyof OrderPlanningRow,
  value: number
): MaterialOrderPlanning {
  const updatedData = { ...currentData };

  if (key in updatedData) {
    updatedData[key] = { ...updatedData[key], [field]: value };
  }
  return updatedData;
}

function returnWarehouseStockForProduct(
  gameData: GameData,
  productId: string
): number {
  const article = gameData.results.warehousestock.article.find(
    (article) => article.id.toString() === productId
  );

  if (article) {
    return article.amount;
  }

  return 0;
}

function calculateDemands(
  productionProgram: ProductionProgramm,
  requiredQuantityP1: number,
  requiredQuantityP2: number,
  requiredQuantityP3: number
): [number, number, number, number] {
  const demands: [number, number, number, number] = [0, 0, 0, 0];

  demands[0] =
    productionProgram.P1.salesOrder.productionWish * requiredQuantityP1 +
    productionProgram.P2.salesOrder.productionWish * requiredQuantityP2 +
    productionProgram.P3.salesOrder.productionWish * requiredQuantityP3;

  for (let i = 0; i < 3; i++) {
    if (
      productionProgram.P1.forecast[i] &&
      productionProgram.P2.forecast[i] &&
      productionProgram.P3.forecast[i]
    ) {
      demands[i + 1] =
        productionProgram.P1.forecast[i].salesOrder.productionWish *
          requiredQuantityP1 +
        productionProgram.P2.forecast[i].salesOrder.productionWish *
          requiredQuantityP2 +
        productionProgram.P3.forecast[i].salesOrder.productionWish *
          requiredQuantityP3;
    }
  }

  return demands;
}
