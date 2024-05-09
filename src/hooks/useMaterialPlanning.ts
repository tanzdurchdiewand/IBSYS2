import { useDispatch, useSelector } from "react-redux";
import {
  MaterialPlanningRow,
  PlanningType,
} from "../types/materialPlanningTypes";
import { RootState } from "../redux/store";
import { } from "../types/inputXMLTypes";
import { useEffect } from "react";
import {
  setInitialPlanning,
  updateAndRecalculatePlanning,
} from "../redux/slices/inputMaterialPlanning";
import {
  initializePlanning,
  recalculatePlanning,
} from "../businessLogic/materialPlanning";

export function useMaterialPlanning() {
  const dispatch = useDispatch();
  const gameData = useSelector((state: RootState) => state.inputXML.list.XML);

  const productionProgramm = useSelector(
    (state: RootState) => state.inputProductionProgramm.data
  );

  const initialPlanning = useSelector(
    (state: RootState) => state.inputMaterialPlanning.initialPlanning
  );

  console.log("useMaterialPlanning", productionProgramm);

  useEffect(() => {
    console.log("useEffect Material Planning called");
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
