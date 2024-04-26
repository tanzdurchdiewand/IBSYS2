import { useDispatch, useSelector } from "react-redux";
import {
  MaterialPlanningRow,
  P1Planning,
  P2Planning,
  P3Planning,
} from "../types/materialPlanningTypes";
import { RootState } from "../redux/store";
import {
  Article,
  GameData,
  WorkplaceOrdersInWork,
} from "../types/inputXMLTypes";
import { ProductionProgramm } from "../types/productionPlanningTypes";
import { useEffect } from "react";
import {
  setInitialPlanning,
  updateAndRecalculatePlanning,
} from "../redux/slices/inputMaterialPlanning";
import { produce } from "immer";

export enum PlanningType {
  P1 = "p1",
  P2 = "p2",
  P3 = "p3",
}

type DependencyMapping = {
  [key: string]: string[];
};

const dependencyMapping: DependencyMapping = {
  "1": ["26", "51"],
  "51": ["16", "17", "50"],
  "50": ["4", "10", "49"],
  "49": ["7", "13", "18"],
};

const salesOrderMap: Map<string, string> = new Map<string, string>();
const prevWaitingQueueMap: Map<string, string> = new Map<string, string>();

const planningConfig: Record<PlanningType, string[]> = {
  p1: [
    "P1",
    "E26",
    "E51",
    "E16",
    "E17",
    "E50",
    "E4",
    "E10",
    "E49",
    "E7",
    "E13",
    "E18",
  ],
  p2: [
    "P2",
    "E26",
    "E56",
    "E16",
    "E17",
    "E55",
    "E5",
    "E11",
    "E54",
    "E8",
    "E14",
    "E19",
  ],
  p3: [
    "P3",
    "E26",
    "E31",
    "E16",
    "E17",
    "E30",
    "E6",
    "E12",
    "E29",
    "E9",
    "E15",
    "E20",
  ],
};

// TODO remove demo data
const productionProgramm: ProductionProgramm = {
  p1: {
    salesorder: {
      salesWish: 100,
      productionWish: 548,
    },
    forcast: [
      {
        period: 1,
        salesorder: {
          salesWish: 80,
          productionWish: 100,
        },
      },
      {
        period: 2,
        salesorder: {
          salesWish: 90,
          productionWish: 110,
        },
      },
    ],
  },
  p2: {
    salesorder: {
      salesWish: 150,
      productionWish: 180,
    },
    forcast: [
      {
        period: 1,
        salesorder: {
          salesWish: 130,
          productionWish: 160,
        },
      },
      {
        period: 2,
        salesorder: {
          salesWish: 140,
          productionWish: 170,
        },
      },
    ],
  },
  p3: {
    salesorder: {
      salesWish: 200,
      productionWish: 220,
    },
    forcast: [
      {
        period: 1,
        salesorder: {
          salesWish: 180,
          productionWish: 200,
        },
      },
      {
        period: 2,
        salesorder: {
          salesWish: 190,
          productionWish: 210,
        },
      },
    ],
  },
};

export function useMaterialPlanning(type: PlanningType) {
  const dispatch = useDispatch();
  const gameData = useSelector((state: RootState) => state.inputXML.list.XML);

  /* TODO still mocked
  const productionProgramm = useSelector(
    (state: RootState) => state.inputProduction.list.productionProgramm
  );*/

  const initialPlanning = useSelector(
    (state: RootState) => state.inputMaterialPlanning.initialPlanning
  );

  useEffect(() => {
    if (gameData && productionProgramm) {
      const planning = initializePlanning(type, gameData, productionProgramm);
      dispatch(setInitialPlanning(planning));
    }
  }, [dispatch, gameData, productionProgramm, type]);

  const updateAndRecalculate = (
    key: string,
    field: keyof MaterialPlanningRow,
    value: number
  ) => {
    if (!initialPlanning) return;

    const recalculatedPlanning = recalculatePlanning(
      key,
      field,
      value,
      initialPlanning
    );
    dispatch(updateAndRecalculatePlanning(recalculatedPlanning));
  };

  if (!gameData || !productionProgramm) return null;

  return { initialPlanning, updateAndRecalculate };
}

function recalculatePlanning(
  key: string,
  field: keyof MaterialPlanningRow,
  value: number,
  planning: P1Planning | P2Planning | P3Planning
) {
  return produce(planning, (draft) => {
    draft[key][field] = value;
  });
}

function initializePlanning(
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

function generateWaitingQueueMap(gameData: GameData) {
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

function createMaterialPlanningRow(
  id: string,
  products: Article[],
  waitingQueueMap: Map<string, string>,
  workInProgressMap: Map<string, string>
): MaterialPlanningRow {
  const salesOrder = Number(salesOrderMap.get(id));
  console.log(
    "salesOrder:",
    salesOrder,
    "id",
    id,
    "salesOrderMap:",
    salesOrderMap
  );
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
