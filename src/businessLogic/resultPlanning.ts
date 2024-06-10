import { SummaryTable } from "../types/capacityPlanningTypes";
import { MaterialOrderPlanning, OrderType } from "../types/orderPlanningTypes";
import {
  ProductionPlan,
  ProductionProgramm,
} from "../types/productionPlanningTypes";
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
    item: [
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
    item: [
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

export function initializeProductionListResult(
  productionPlan: ProductionPlan
): ProductionList {
  const productionList: ProductionList = {
    production: productionPlan.productionPlan.map((item) => ({
      article: item.item || 0, // Falls item.item undefined ist, wird 0 als Standardwert gesetzt
      quantity: item.amount,
    })),
  };

  return productionList;
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
  const order: Order[] = [];

  for (const key in materialOrderPlanning) {
    if (materialOrderPlanning.hasOwnProperty(key)) {
      const orderPlanningRow = materialOrderPlanning[key];

      const { productName, orderQuantity, orderType } = orderPlanningRow;

      const orderItem: Order = {
        article: productName,
        quantity: orderQuantity,
        modus:
          orderType === OrderType.Normal
            ? 5
            : orderType === OrderType.Fast
            ? 4
            : 5,
      };

      // Only add to Orders if we need to Order the Article
      if (Number(orderItem.quantity) > 0) {
        order.push(orderItem);
      }
    }
  }

  return { order };
}

export function mapSummaryRowToWorkingTimeList(
  summaryTable: SummaryTable
): WorkingTimeList | null {
  const shiftsAndOvertimesRow = summaryTable.find(
    (row) => row.label === "Shifts And Overtime Per Days"
  );

  if (!shiftsAndOvertimesRow) {
    return null;
  }

  const { values } = shiftsAndOvertimesRow;

  const workingTimes: WorkingTime[] = [];

  // Grundkapazität pro Arbeitsplatz pro Periode
  const baseCapacityPerPeriod = 2400; // Minuten

  // Durchgehen der Werte für Überstunden und Schichten
  values.forEach((overtime, index) => {
    let shifts = 1;
    let capacity = Math.round(overtime * 5 + baseCapacityPerPeriod);
    let cappedOvertime = 0;

    // Workstation 5 is not used
    if (index === 4) {
      shifts = 0;
    }

    if (capacity > baseCapacityPerPeriod && capacity <= 3600) {
      cappedOvertime = capacity - baseCapacityPerPeriod;
    } else if (capacity > 3600 && capacity <= 4800) {
      shifts = 2;
      cappedOvertime = 0;
    } else if (capacity > 4800 && capacity <= 6000) {
      shifts = 2;
      cappedOvertime = capacity - 4800;
    } else if (capacity > 6000) {
      shifts = 3;
      cappedOvertime = 0;
    }

    const baseWorkingTime: WorkingTime = {
      station: index + 1,
      shift: shifts,
      overtime: cappedOvertime,
    };

    workingTimes.push(baseWorkingTime);
  });

  return { workingTime: workingTimes };
}
