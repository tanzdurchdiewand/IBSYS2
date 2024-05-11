import {
  Article,
  GameData,
  WorkplaceOrdersInWork,
} from "../types/inputXMLTypes";
import {
  MaterialPlanningRow,
  Planning,
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
  planning: Planning,
  type: PlanningType
): Planning {
  return produce(planning, (draft) => {
    draft[type][key][field] = value;
    const id = key.replace(/\D/g, "");

    const difference = -planning[type][key][field] + value;
    const newProductionOrder: number =
      Number(productionOrderMap.get(id)!) + difference;

    productionOrderMap.set(id, newProductionOrder.toString());
    draft[type][key].productionOrder = Number(productionOrderMap.get(id));

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

        draft[type][dId].salesOrder = newValSalesOrder;
        draft[type][dId].productionOrder = newValProdOrder;
      });
    }
  });
}

export function initializePlanning(
  gameData: GameData,
  productionProgramm: ProductionProgramm,
  currentMaterialPlanning: Planning | null
): Planning {
  const planning: any = { P1: {}, P2: {}, P3: {} };
  const products = gameData.results.warehousestock.article;
  const waitingQueueMap = generateWaitingQueueMap(gameData);
  const workInProgressMap = generateWorkInProgressMap(gameData);
  const types = [PlanningType.P1, PlanningType.P2, PlanningType.P3];

  types.forEach((type) => {
    const elementIds = planningConfig[type];
    const salesOrderForPeriod =
      productionProgramm[type].salesOrder.productionWish.toString();

    var idType = type.replace(/\D/g, "");

    salesOrderMap.set(idType, salesOrderForPeriod);
    prevWaitingQueueMap.set(idType, "0");


    elementIds.forEach((elementId) => {
      const currentSafetyStock = currentMaterialPlanning ? currentMaterialPlanning[type][elementId].safetyStock : null;
      const numericId = parseInt(elementId.replace(/\D/g, ""), 10);
      planning[type][elementId] = createMaterialPlanningRow(
        numericId.toString(),
        products,
        waitingQueueMap,
        workInProgressMap,
        currentSafetyStock
      );
    });
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
        ? parseInt(existingAmount) + Number(workplace.amount)
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
  workInProgressMap: Map<string, string>,
  currentSafetyStock: number | null
): MaterialPlanningRow {
  const salesOrder = Number(salesOrderMap.get(id));
  const previousWaitingQueue = Number(prevWaitingQueueMap.get(id));
  const stock = Math.trunc(
    products.find((product) => product.id.toString() === id)?.pct ?? 0
  );
  const waitingQueue = Number(waitingQueueMap.get(id) ?? 0);
  const workInProgress = Number(workInProgressMap.get(id) ?? 0);

  const calcSafetyStock = currentSafetyStock ? currentSafetyStock : stock;

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
