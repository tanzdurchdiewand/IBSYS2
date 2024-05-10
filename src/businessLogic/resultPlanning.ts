import { SummaryTable } from "../types/capacityPlanningTypes";
import { MaterialOrderPlanning, OrderType } from "../types/orderPlanningTypes";
import { ProductionProgramm } from "../types/productionPlanningTypes";
import {
  Order,
  OrderList,
  ProductionList,
  Selldirect,
  Sellwish,
  WorkingTime,
  WorkingTimeList,
} from "../types/resultTypes";

export function initializeSellWishResult(
  productionProgramm: ProductionProgramm
): Sellwish {
  const sellwish: Sellwish = {
    sellWishItems: [
      { article: 1, quantity: productionProgramm.P1.salesOrder.salesWish },
      { article: 2, quantity: productionProgramm.P2.salesOrder.salesWish },
      { article: 3, quantity: productionProgramm.P3.salesOrder.salesWish },
    ],
  };

  return sellwish;
}

export function initializeSellDirectResult(
  productionProgramm: ProductionProgramm
): Selldirect {
  const selldirect: Selldirect = {
    sellDirectItems: [
      {
        article: 1,
        quantity: productionProgramm.directSell.P1.amount,
        price: productionProgramm.directSell.P1.price,
        penalty: productionProgramm.directSell.P1.penalty,
      },
      {
        article: 2,
        quantity: productionProgramm.directSell.P2.amount,
        price: productionProgramm.directSell.P2.price,
        penalty: productionProgramm.directSell.P1.penalty,
      },
      {
        article: 3,
        quantity: productionProgramm.directSell.P3.amount,
        price: productionProgramm.directSell.P3.price,
        penalty: productionProgramm.directSell.P3.penalty,
      },
    ],
  };

  return selldirect;
}

export function initializeOrderListResult(
  orderPlanning: MaterialOrderPlanning
): OrderList {
  return mapMaterialOrderPlanningToOrderList(orderPlanning);
}

export function initializeProductionListResult(): ProductionList {
  // TODO Still Mock data
  const mockProductionList: ProductionList = {
    productions: [
      { article: 1, quantity: 1000 },
      { article: 2, quantity: 1200 },
      { article: 3, quantity: 1400 },
    ],
  };

  return mockProductionList;
}

export function initializeWorkingTimeListResult(
  capacitySummaryRows: SummaryTable
): WorkingTimeList {
  const capa = mapSummaryRowToWorkingTimeList(capacitySummaryRows);

  return capa!;
}

function mapMaterialOrderPlanningToOrderList(
  materialOrderPlanning: MaterialOrderPlanning
): OrderList {
  const orders: Order[] = [];

  for (const key in materialOrderPlanning) {
    if (materialOrderPlanning.hasOwnProperty(key)) {
      const orderPlanningRow = materialOrderPlanning[key];

      const { productName, orderQuantity, orderType } = orderPlanningRow;

      const order: Order = {
        article: productName,
        quantity: orderQuantity,
        modus:
          orderType === OrderType.Normal
            ? 4
            : orderType === OrderType.Fast
            ? 5
            : 4,
      };

      // Only add to Orders if we need to Order the Article
      if (Number(order.quantity) > 0) {
        orders.push(order);
      }
    }
  }

  return { orders };
}

export function mapSummaryRowToWorkingTimeList(
  summaryTable: SummaryTable
): WorkingTimeList | null {
  const shiftsAndOvertimesRow = summaryTable.find(
    (row) => row.label === "Shifts And Overtimes"
  );

  if (!shiftsAndOvertimesRow) {
    return null;
  }

  const { values } = shiftsAndOvertimesRow;

  // TODO Shifts
  const workingTimes: WorkingTime[] = values.map((overtime, index) => ({
    station: index + 1,
    shift: 1,
    overtime: overtime,
  }));

  return { worrkingTimes: workingTimes };
}
