import { useDispatch, useSelector } from "react-redux";
import {
  MaterialPlanningRow,
  PlanningType,
} from "../types/materialPlanningTypes";
import { RootState } from "../redux/store";
import {} from "../types/inputXMLTypes";
import { ProductionProgramm } from "../types/productionPlanningTypes";
import { useEffect } from "react";
import {
  setInitialPlanning,
  updateAndRecalculatePlanning,
} from "../redux/slices/inputMaterialPlanning";
import {
  initializePlanning,
  recalculatePlanning,
} from "../businessLogic/materialPlanning";

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

export function useMaterialPlanning() {
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

    if (gameData && productionProgramm && !initialPlanning) {
      const planning = initializePlanning(gameData, productionProgramm);
      dispatch(setInitialPlanning(planning));
    }
  }, [dispatch, gameData, productionProgramm, initialPlanning]);

  const updateAndRecalculate = (
    key: string,
    field: keyof MaterialPlanningRow,
    value: number,
    type: PlanningType
  ) => {
    if (!initialPlanning) return;

    const recalculatedPlanning = recalculatePlanning(
      key,
      field,
      value,
      initialPlanning,
      type
    );
    dispatch(updateAndRecalculatePlanning(recalculatedPlanning));
  };

  return { initialPlanning, updateAndRecalculate };
}
