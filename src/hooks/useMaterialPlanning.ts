import { useSelector } from "react-redux";
import {
  MaterialPlanningRow,
  P1Planning,
  P2Planning,
  P3Planning,
} from "../types/materialPlanningTypes";
import { RootState } from "../redux/store";
import { GameData } from "../types/inputXMLTypes";
import { ProductionProgramm } from "../types/productionPlanningTypes";

export enum PlanningType {
  P1 = "p1",
  P2 = "p2",
  P3 = "p3",
}

const planningConfig: Record<PlanningType, string[]> = {
  p1: ["P1", "E26", "E51", "E16", "E17", "E50", "E4", "E10", "E49", "E7", "E13", "E18"],
  p2: ["P2", "E26", "E56", "E16", "E17", "E55", "E5", "E11", "E54", "E8", "E14", "E19"],
  p3: ["P3", "E26", "E31", "E16", "E17", "E30", "E6", "E12", "E29", "E9", "E15", "E20"],
};

export function useMaterialPlanning(
  type: PlanningType
): P1Planning | P2Planning | P3Planning | null {
  const gameData = useSelector((state: RootState) => state.inputXML.list.XML);
  // TODO Redux store
  /*
  const productionProgramm = useSelector(
    (state: RootState) => state.inputProduction.list.productionProgramm
  );
  */
  const productionProgramm: ProductionProgramm = {
    p1: {
      salesorder: {
        salesWish: 100,
        productionWish: 120,
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

  console.log("createP1Planning");
  console.log("GameData: " + JSON.stringify(gameData, null, 2));
  console.log("Production Programm: " + productionProgramm);

  if (!gameData || !productionProgramm) return null;

  return createPlanning(type, gameData, productionProgramm);
}

function createPlanning(
  type: PlanningType,
  gameData: GameData,
  productionProgramm: ProductionProgramm
): P1Planning | P2Planning | P3Planning {
  const elementIds = planningConfig[type];
  const planning: any = {};

  elementIds.forEach((elementId) => {
    const numericId = parseInt(elementId.replace(/\D/g, ''), 10);
    planning[elementId] = createMaterialPlanningRow(
      numericId,
      gameData,
      productionProgramm
    );
  });

  // Ensure the correct 'p' property is also included (p1, p2, p3)
  planning[type] = createMaterialPlanningRow(
    parseInt(type[1], 10),
    gameData,
    productionProgramm
  );

  return planning;
}

function createMaterialPlanningRow(
  id: number,
  gameData: GameData,
  productionProgramm: ProductionProgramm
): MaterialPlanningRow {
  const products = gameData.results.warehousestock.article;
  const salesOrders = productionProgramm;
  const waitingQueueMap =
    gameData.results.waitinglistworkstations.workplace.reduce(
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

  // TODO
  const salesOrder = 0;
  const previousWaitingQueue = 0;
  const stock = 0; //products.find((product) => product.id === id)?.amount ?? 0;

  const waitingQueue = Number(waitingQueueMap.get(id.toString()) ?? 0);
  const workInProgress = 0;
  const calcSafetyStock =
    -previousWaitingQueue + stock + waitingQueue + workInProgress;
  const calcProdOrder =
    salesOrder +
    previousWaitingQueue +
    calcSafetyStock -
    stock -
    waitingQueue -
    workInProgress;

  return {
    productName: id,
    salesOrder: salesOrder,
    previousWaitingQueue: previousWaitingQueue,
    safetyStock: calcSafetyStock,
    stock: stock,
    waitingQueue: waitingQueue,
    workInProgress: workInProgress,
    productionOrder: calcProdOrder,
  };
}
