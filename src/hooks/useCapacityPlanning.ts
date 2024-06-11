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

  const productionProgramm = useSelector(
    (state: RootState) => state.inputProductionProgramm.data
  );

  const gameData = useSelector((state: RootState) => state.inputXML.list.XML);

  const capacityRows = useSelector(
    (state: RootState) => state.inputCapacityPlanning.capacityRows
  );
  const summaryRows = useSelector(
    (state: RootState) => state.inputCapacityPlanning.summaryRows
  );

  useEffect(() => {
    dispatch(
      setCapacityPlanningData(initializeCapacityPlanning(productionProgramm!))
    );
  }, [dispatch, productionProgramm]);

  useEffect(() => {
    dispatch(
      setSummaryData(
        initializeCapacityPlanningSummary(capacityRows, summaryRows, gameData!)
      )
    );
  }, [dispatch, capacityRows]);

  const handleValueChange = (
    index: number,
    valueIndex: number,
    value: number
  ) => {
    if (value >= 0) {
      const newValues = [...summaryRows[index].values!];
      newValues[valueIndex] = value;
      dispatch(updateCapacityPlanningRow({ index, values: newValues }));
    }
  };

  return {
    capacityRows,
    summaryRows,
    handleValueChange,
  };
};
