import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { } from "../types/inputXMLTypes";
import { useEffect } from "react";
import {
  setOrderPlanning,
  updateOrderPlanning,
} from "../redux/slices/inputOrderPlanning";
import {
  initializeOrderPlanning,
  updateOrderRow,
} from "../businessLogic/orderPlanning";
import { OrderPlanningRow } from "../types/orderPlanningTypes";

export function useOrderPlanning() {
  const dispatch = useDispatch();

  const gameData = useSelector((state: RootState) => state.inputXML.list.XML);
  const productionProgramm = useSelector(
    (state: RootState) => state.inputProduction.list.productionProgramm
  );
  const initialOrderPlanning = useSelector(
    (state: RootState) => state.inputOrderPlanning.orderPlanning
  );

  useEffect(() => {
    console.log("useEffect called");
    if (gameData && productionProgramm && !initialOrderPlanning) {
      const orderPlanning = initializeOrderPlanning(
        gameData,
        productionProgramm
      );
      dispatch(setOrderPlanning(orderPlanning));
    }
  }, [dispatch, gameData, productionProgramm]);

  const updateOrder = (
    key: string,
    field: keyof OrderPlanningRow,
    value: number
  ) => {
    if (!initialOrderPlanning) return;

    console.log("updateOrder called");

    const update = updateOrderRow(key, field, value);
    dispatch(updateOrderPlanning(update));
  };

  return { initialOrderPlanning, updateOrder };
}
