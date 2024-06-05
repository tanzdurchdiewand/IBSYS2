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
      id: item.id,
      article: item.item || 0, // Falls item.item undefined ist, wird 0 als Standardwert gesetzt
      quantity: item.amount,
    })),
  };

  return productionList;
}

// export function initializeProductionListResult(
//   productionPlan: ProductionPlan
// ): ProductionList {
//   // TODO Still Mock data  ID = Reinfolge
//   const productionList: ProductionList = productionPlan;
//   // const productionList: ProductionList = {
//   //   production: [
//   //     { id: 1, article: 1, quantity: 1000 },
//   //     { id: 2, article: 2, quantity: 1200 },
//   //     { id: 3, article: 3, quantity: 1400 },
//   //   ],
//   // };

//   return productionList;
// }

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

  // Maximale Überstunden pro Periode (50% der Grundkapazität)
  const maxOvertimePerPeriod = baseCapacityPerPeriod / 2;

  // Durchgehen der Werte für Überstunden und Schichten
  values.forEach((overtime, index) => {
    // Überstunden pro Periode begrenzen
    const cappedOvertime = Math.min(overtime, maxOvertimePerPeriod);

    // Hinzufügen der Arbeitszeit für die Schicht ohne Überstunden
    const baseWorkingTime: WorkingTime = {
      station: index + 1,
      shift: 1,
      overtime: cappedOvertime, // Standardkapazität plus Überstunden
    };
    workingTimes.push(baseWorkingTime);
  });

  return { workingTime: workingTimes };
}
