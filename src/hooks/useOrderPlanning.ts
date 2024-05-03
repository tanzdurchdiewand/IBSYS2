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
  console.log("Hook called"); // Check if the hook itself is being executed
  const dispatch = useDispatch();

  const gameData = useSelector((state: RootState) => state.inputXML.list.XML);
  const productionProgramm = useSelector(
    (state: RootState) => state.inputProduction.list.productionProgramm
  );
  const initialOrderPlanning = useSelector(
    (state: RootState) => state.inputOrderPlanning.orderPlanning
  );

  console.log(
    "Initial data:",
    gameData,
    "prodProgramm", productionProgramm,
    "order", initialOrderPlanning
  );

  useEffect(() => {
    console.log("useEffect called");
    if (gameData && productionProgramm && !initialOrderPlanning) {
      const orderPlanning = initializeOrderPlanning(
        gameData,
        productionProgramm
      );
      console.log("Order planning initialized:", orderPlanning);
      dispatch(setOrderPlanning(orderPlanning));
    }
  }, [dispatch, gameData, productionProgramm]);

  // TODO warum null?
  console.log("nach initializhe:", initialOrderPlanning);

  const updateOrder = (
    key: string,
    field: keyof OrderPlanningRow,
    value: number
  ) => {
    if (!initialOrderPlanning) return;

    const update = updateOrderRow(key, field, value);
    dispatch(updateOrderPlanning(update));
  };

  return { initialOrderPlanning, updateOrderPlanning };
}
