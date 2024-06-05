import { GameData } from "../types/inputXMLTypes";
import {
  MaterialOrderPlanning,
  OrderPlanningRow,
  OrderType,
  orderDetail,
} from "../types/orderPlanningTypes";
import { ProductionProgramm } from "../types/productionPlanningTypes";

export function initializeOrderPlanning(
  gameData: GameData,
  productionProgramm: ProductionProgramm,
  currentOrder: MaterialOrderPlanning | null
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
    const pendingOrderType = filteredOrders?.mode ?? 0;

    interface OrderPlanningRow {
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
      pendingOrderPeriod: number;
      pendingOrderAmount: number;
      pendingOrderType: OrderType;
    }

    function calculateOptimalOrder(row: OrderPlanningRow): {
      optimalOrderQuantity: number;
      orderType: OrderType;
    } {
      const {
        deliveryTime,
        warehouseStock,
        demandForPeriod,
        pendingOrderAmount,
        pendingOrderPeriod,
      } = row;

      console.log(row);
      // Berechne die zukünftige Nachfrage bis zur Lieferzeit
      const futureDemand = demandForPeriod
        .slice(0, deliveryTime)
        .reduce((acc, demand) => acc + demand, 0);

      // Berechne den Lagerbestand unter Berücksichtigung der anstehenden Bestellungen
      let adjustedStock = Number(warehouseStock) - futureDemand;
      if (Number(pendingOrderPeriod) <= deliveryTime) {
        adjustedStock += Number(pendingOrderAmount);
      }

      // Berechne die optimale Bestellmenge
      const optimalOrderQuantity =
        futureDemand - adjustedStock > 0 ? futureDemand - adjustedStock : 0;

      // Entscheide, ob eine schnelle Bestellung notwendig ist
      const requiredOrderType =
        futureDemand > warehouseStock ? OrderType.Fast : OrderType.Normal;

      return {
        optimalOrderQuantity,
        orderType: requiredOrderType,
      };
    }

    const calculatedOrderQuantityData = currentOrder
      ? currentOrder[key]
      : {
          productName: key as unknown as number,
          deliveryTime: details.deliveryTime,
          deviation: details.deviation,
          quantityP1: details.requiredQuantityP1,
          quantityP2: details.requiredQuantityP2,
          quantityP3: details.requiredQuantityP3,
          discountQuantity: details.discountQuantity,
          warehouseStock: warehouseStock,
          demandForPeriod: demands,
          orderQuantity: 0,
          orderType: OrderType.Normal,
          pendingOrderPeriod: pendingOrderPeriod,
          pendingOrderAmount: pendingOrderAmount,
          pendingOrderType: pendingOrderType,
        };

    const calculatedOrderQuantityTest = calculateOptimalOrder(
      calculatedOrderQuantityData
    );
    console.log(calculatedOrderQuantityTest);

    const orderQuantity = currentOrder
      ? currentOrder[key].orderQuantity
      : calculatedOrderQuantityTest.optimalOrderQuantity;
    const orderType = currentOrder
      ? currentOrder[key].orderType
      : calculatedOrderQuantityTest.orderType;

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
      pendingOrderType: pendingOrderType,
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
