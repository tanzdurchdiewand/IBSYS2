import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { updateOrderPlanning } from "../redux/slices/inputOrderPlanning";
import { OrderPlanningRow } from "../types/orderPlanningTypes";
import { fetchInitialOrderPlanning } from "../redux/slices/global";

export function useOrderPlanning() {
  const dispatch: AppDispatch = useDispatch();
  const orderPlanning = useSelector(
    (state: RootState) => state.inputOrderPlanning.data
  );

  const gameData = useSelector((state: RootState) => state.inputXML.list.XML);

  const productionProgramm = useSelector(
    (state: RootState) => state.inputProductionProgramm.data
  );

  useEffect(() => {
    dispatch(fetchInitialOrderPlanning());
  }, [dispatch, gameData, productionProgramm]);

  const updateOrder = (
    key: string,
    field: keyof OrderPlanningRow,
    value: number
  ) => {
    if (value >= 0) {
      dispatch(updateOrderPlanning({ key, field, value }));
    }
  };

  return { orderPlanning, updateOrder };
}
