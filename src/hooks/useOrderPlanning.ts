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
  useEffect(() => {
    if (!orderPlanning) {
      dispatch(fetchInitialOrderPlanning());
    }
  }, [dispatch, orderPlanning]);

  const updateOrder = (
    key: string,
    field: keyof OrderPlanningRow,
    value: number
  ) => {
    dispatch(updateOrderPlanning({ key, field, value }));
  };

  return { orderPlanning, updateOrder };
}
