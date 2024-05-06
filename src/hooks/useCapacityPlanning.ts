import { useEffect } from "react";
import { RootState, useDispatch, useSelector } from "../redux/store";
import {
  initializeCapacityPlanning,
  initializeCapacityPlanningSummary,
} from "../businessLogic/capacityPlanning";
import {
  setCapacityPlanningData,
  setSummaryData,
  updateCapacityPlanningRow,
} from "../redux/slices/inputCapacityPlanning";

export const useCapacityPlanning = () => {
  const dispatch = useDispatch();
  const gameData = useSelector((state: RootState) => state.inputXML.list.XML);

  const productionProgramm = useSelector(
    (state: RootState) => state.inputProduction.list.productionProgramm
  );

  const capacityRows = useSelector(
    (state: RootState) => state.inputCapacityPlanning.capacityRows
  );
  const summaryRows = useSelector(
    (state: RootState) => state.inputCapacityPlanning.summaryRows
  );

  useEffect(() => {
    if (gameData && productionProgramm) {
      dispatch(
        setCapacityPlanningData(
          initializeCapacityPlanning(gameData, productionProgramm)
        )
      );
      dispatch(setSummaryData(initializeCapacityPlanningSummary(capacityRows)));
    }
  }, [dispatch, gameData, productionProgramm]);

  const handleValueChange = (
    index: number,
    valueIndex: number,
    value: number
  ) => {
    const newValues = [...summaryRows[index].values];
    newValues[valueIndex] = value;
    dispatch(updateCapacityPlanningRow({ index, values: newValues }));
  };

  return {
    capacityRows,
    summaryRows,
    handleValueChange,
  };
};
