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
import { enableMapSet, produce } from "immer";
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

export const stockMap: Map<string, string> = new Map<string, string>();

enableMapSet();

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

    draft.safetyStockMap.set(id, value.toString());

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
  const planning: any = {
    P1: {},
    P2: {},
    P3: {},
    safetyStockMap: new Map<string, string>(),
  };
  const products = gameData.results.warehousestock.article;
  const waitingQueueMap = generateWaitingQueueMap(gameData);
  const workInProgressMap = generateWorkInProgressMap(gameData);
  setStockMap(products);
  setPreviousWaitingQueueMap();
  setSalesOrderMap(productionProgramm);

  // Only Initialise 1 time
  if (currentMaterialPlanning === null) {
    setSafetyStockMap(
      salesOrderMap,
      prevWaitingQueueMap,
      stockMap,
      waitingQueueMap,
      workInProgressMap,
      productionProgramm,
      planning,
      products
    );
  } else {
    // TODO recalculate safetyStock if production programm or gamedata changes but initialPlanning is not null
    // What should happen if productionProgramm changes?
    planning.safetyStockMap = currentMaterialPlanning.safetyStockMap;
  }

  const types = [PlanningType.P1, PlanningType.P2, PlanningType.P3];

  types.forEach((type) => {
    const elementIds = planningConfig[type];

    elementIds.forEach((elementId) => {
      const numericId = parseInt(elementId.replace(/\D/g, ""), 10);

      planning[type][elementId] = createMaterialPlanningRow(
        numericId.toString(),
        stockMap,
        waitingQueueMap,
        workInProgressMap,
        planning.safetyStockMap,
        productionProgramm
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

function setSalesOrderMap(productionProgramm: ProductionProgramm) {
  salesOrderMap.set("1", productionProgramm.P1.salesOrder.salesWish.toString());
  salesOrderMap.set("2", productionProgramm.P2.salesOrder.salesWish.toString());
  salesOrderMap.set("3", productionProgramm.P3.salesOrder.salesWish.toString());
}

function setPreviousWaitingQueueMap() {
  prevWaitingQueueMap.set("1", "0");
  prevWaitingQueueMap.set("2", "0");
  prevWaitingQueueMap.set("3", "0");
}

function generateWorkInProgressMap(gameData: GameData): Map<string, string> {
  if (gameData.results.ordersinwork.workplace !== undefined) {
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
  } else {
    return new Map<string, string>();
  }
}

function setStockMap(products: Article[]) {
  products.forEach((product) => {
    stockMap.set(product.id.toString(), product.amount.toString());
  });
}

function setSafetyStockMap(
  salesOrderMap: Map<string, string>,
  previousWaitingQueueMap: Map<string, string>,
  stockMap: Map<string, string>,
  waitingQueueMap: Map<string, string>,
  workInProgressMap: Map<string, string>,
  productionProgramm: ProductionProgramm,
  planning: Planning | null,
  products: Article[]
) {
  products.forEach((product) => {
    planning?.safetyStockMap.set(
      product.id.toString(),
      product.amount.toString()
    );
  });

  const keys = ["1", "2", "3"];
  const productionKeys = [PlanningType.P1, PlanningType.P2, PlanningType.P3];

  keys.forEach((key, index) => {
    const salesOrder = Number(salesOrderMap.get(key)) || 0;
    const previousWaitingQueue = Number(previousWaitingQueueMap.get(key)) || 0;
    const stock = Number(stockMap.get(key)) || 0;
    const waitingQueue = Number(waitingQueueMap.get(key)) || 0;
    const workInProgress = Number(workInProgressMap.get(key)) || 0;
    const productionWish =
      Number(
        productionProgramm[productionKeys[index]]?.salesOrder.productionWish
      ) || 0;

    const c =
      -salesOrder -
      previousWaitingQueue +
      stock +
      waitingQueue +
      workInProgress +
      productionWish;

    planning?.safetyStockMap.set(key, c.toString());
  });
}

export function createMaterialPlanningRow(
  id: string,
  stockMap: Map<string, string>,
  waitingQueueMap: Map<string, string>,
  workInProgressMap: Map<string, string>,
  safetyStockMap: Map<string, string>,
  productionProgramm: ProductionProgramm
): MaterialPlanningRow {
  const salesOrder = Number(salesOrderMap.get(id));
  const previousWaitingQueue = Number(prevWaitingQueueMap.get(id));

  // handle E16, E17, E26
  const newId = id.length >= 3 ? id.slice(0, -1) : id;

  const stock = Number(stockMap.get(newId) ?? 0);
  const waitingQueue = Number(waitingQueueMap.get(newId) ?? 0);
  const workInProgress = Number(workInProgressMap.get(newId) ?? 0);

  const safetyStock = Number(safetyStockMap?.get(newId) ?? 0);

  let calcProdOrder =
    salesOrder +
    previousWaitingQueue +
    safetyStock -
    stock -
    waitingQueue -
    workInProgress;

  if (id === "1") {
    calcProdOrder = productionProgramm.P1.salesOrder.productionWish;
  } else if (id === "2") {
    calcProdOrder = productionProgramm.P2.salesOrder.productionWish;
  } else if (id === "3") {
    calcProdOrder = productionProgramm.P3.salesOrder.productionWish;
  }

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
    safetyStock: safetyStock,
    stock: stock,
    waitingQueue: waitingQueue,
    workInProgress: workInProgress,
    productionOrder: calcProdOrder < 0 ? 0 : calcProdOrder,
  };
}
