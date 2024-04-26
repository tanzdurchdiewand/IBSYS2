import {
  Article,
  GameData,
  WorkplaceOrdersInWork,
} from "../types/inputXMLTypes";
import {
  MaterialPlanningRow,
  P1Planning,
  P2Planning,
  P3Planning,
  PlanningType,
  dependencyMapping,
  planningConfig,
  updateOrdersMapping,
} from "../types/materialPlanningTypes";
import { produce } from "immer";
import { ProductionProgramm } from "../types/productionPlanningTypes";

export const salesOrderMap: Map<string, string> = new Map<string, string>();
export const productionOrderMap: Map<string, string> = new Map<
  string,
  string
>();
export const prevWaitingQueueMap: Map<string, string> = new Map<
  string,
  string
>();

export function recalculatePlanning(
  key: string,
  field: keyof MaterialPlanningRow,
  value: number,
  planning: P1Planning | P2Planning | P3Planning
) {
  return produce(planning, (draft) => {
    draft[key][field] = value;
    const id = key.replace(/\D/g, "");

    const difference = -planning[key][field] + value;
    const newProductionOrder: number =
      Number(productionOrderMap.get(id)!) + difference;

    productionOrderMap.set(id, newProductionOrder.toString());
    draft[key].productionOrder = Number(productionOrderMap.get(id));

    const baseId = updateOrdersMapping[id];
    if (baseId) {
      baseId.forEach((dependentId) => {
        const newValSalesOrder: number =
          Number(salesOrderMap.get(dependentId)!) + difference;
        salesOrderMap.set(dependentId, newValSalesOrder.toString());

        const newValProdOrder: number =
          Number(productionOrderMap.get(dependentId)!) + difference;
        productionOrderMap.set(dependentId, newValProdOrder.toString());

        const dId = "E" + dependentId;

        draft[dId].salesOrder = newValSalesOrder;
        draft[dId].productionOrder = newValProdOrder;
      });
    }
  });
}

export function initializePlanning(
  type: PlanningType,
  gameData: GameData,
  productionProgramm: ProductionProgramm
): P1Planning | P2Planning | P3Planning {
  const elementIds = planningConfig[type];
  const planning: any = {};

  const salesOrderForPeriod =
    productionProgramm[type].salesorder.productionWish.toString();

  salesOrderMap.set("1", salesOrderForPeriod);
  prevWaitingQueueMap.set("1", "0");

  const products = gameData.results.warehousestock.article;
  const waitingQueueMap = generateWaitingQueueMap(gameData);
  const workInProgressMap = generateWorkInProgressMap(gameData);

  elementIds.forEach((elementId) => {
    const numericId = parseInt(elementId.replace(/\D/g, ""), 10);
    planning[elementId] = createMaterialPlanningRow(
      numericId.toString(),
      products,
      waitingQueueMap,
      workInProgressMap
    );
  });

  return planning;
}

export function generateWaitingQueueMap(gameData: GameData) {
  return gameData.results.waitinglistworkstations.workplace.reduce(
    (map, workplace) => {
      const normalizedWaitingList = Array.isArray(workplace.waitinglist)
        ? workplace.waitinglist
        : workplace.waitinglist
        ? [workplace.waitinglist]
        : [];

      normalizedWaitingList.forEach(({ item, amount }) => {
        map.set(item.toString(), amount.toString());
      });
      return map;
    },
    new Map<string, string>()
  );
}

function generateWorkInProgressMap(gameData: GameData): Map<string, string> {
  return gameData.results.ordersinwork.workplace.reduce(
    (map: Map<string, string>, workplace: WorkplaceOrdersInWork) => {
      const key = workplace.item.toString();
      const existingAmount = map.get(key);
      const newAmount = existingAmount
        ? parseInt(existingAmount) + workplace.amount
        : workplace.amount;
      map.set(key, newAmount.toString());
      return map;
    },
    new Map<string, string>()
  );
}

export function createMaterialPlanningRow(
  id: string,
  products: Article[],
  waitingQueueMap: Map<string, string>,
  workInProgressMap: Map<string, string>
): MaterialPlanningRow {
  const salesOrder = Number(salesOrderMap.get(id));
  const previousWaitingQueue = Number(prevWaitingQueueMap.get(id));
  const stock = Math.trunc(
    products.find((product) => product.id.toString() === id)?.pct ?? 0
  );
  const waitingQueue = Number(waitingQueueMap.get(id) ?? 0);
  const workInProgress = Number(workInProgressMap.get(id) ?? 0);

  const calcSafetyStock = stock; //-previousWaitingQueue + stock + waitingQueue + workInProgress; // TODO ?

  const calcProdOrder =
    salesOrder +
    previousWaitingQueue +
    calcSafetyStock -
    stock -
    waitingQueue -
    workInProgress;

  productionOrderMap.set(id, calcProdOrder.toString());

  const baseId = dependencyMapping[id];
  if (baseId) {
    baseId.forEach((dependentId) => {
      salesOrderMap.set(dependentId, calcProdOrder.toString());
      prevWaitingQueueMap.set(dependentId, waitingQueue.toString());
    });
  }

  return {
    productName: Number(id),
    salesOrder: salesOrder,
    previousWaitingQueue: previousWaitingQueue,
    safetyStock: calcSafetyStock,
    stock: stock,
    waitingQueue: waitingQueue,
    workInProgress: workInProgress,
    productionOrder: calcProdOrder < 0 ? 0 : calcProdOrder,
  };
}
