import { useEffect } from "react";
import { RootState, useDispatch, useSelector } from "../redux/store";
import {
  generateCapacityPlanningRows,
  generateSummaryRows,
} from "../businessLogic/capacityPlanning";
import {
  setCapacityPlanningData,
  setSummaryData,
  updateCapacityPlanningRow,
} from "../redux/slices/inputCapacityPlanning";

export const useCapacityPlanning = () => {
  const dispatch = useDispatch();
  const capacityRows = useSelector(
    (state: RootState) => state.inputCapacityPlanning.capacityRows
  );
  const summaryRows = useSelector(
    (state: RootState) => state.inputCapacityPlanning.summaryRows
  );

  useEffect(() => {
    dispatch(setCapacityPlanningData(generateCapacityPlanningRows()));
    dispatch(setSummaryData(generateSummaryRows()));
  }, [dispatch]);

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
