import { useEffect } from "react";
import { RootState, useDispatch, useSelector } from "../redux/store";
import {
  setOrderlistData,
  setProductionlistData,
  setSelldirectData,
  setSellwishData,
  setWorkingtimelistData,
} from "../redux/slices/resultXml";
import {
  initializeOrderListResult,
  initializeProductionListResult,
  initializeSellDirectResult,
  initializeSellWishResult,
  initializeWorkingTimeListResult,
} from "../businessLogic/resultPlanning";

export const useReult = () => {
  const dispatch = useDispatch();

  // TODO benötigten daten für die initialisierung an business layer
  const productionProgramm = useSelector(
    (state: RootState) => state.inputProductionProgramm.data
  );

  const capacityRows = useSelector(
    (state: RootState) => state.inputCapacityPlanning.capacityRows
  );
  const summaryRows = useSelector(
    (state: RootState) => state.inputCapacityPlanning.summaryRows
  );

  const sellwish = useSelector((state: RootState) => state.resultXml.sellwish);
  const selldirect = useSelector(
    (state: RootState) => state.resultXml.selldirect
  );
  const orderlist = useSelector(
    (state: RootState) => state.resultXml.orderlist
  );
  const productionlist = useSelector(
    (state: RootState) => state.resultXml.productionlist
  );
  const workingtimelist = useSelector(
    (state: RootState) => state.resultXml.workingtimelist
  );

  useEffect(() => {
    dispatch(setSellwishData(initializeSellWishResult()));
    dispatch(setSelldirectData(initializeSellDirectResult()));
    dispatch(setOrderlistData(initializeOrderListResult()));
    dispatch(setProductionlistData(initializeProductionListResult()));
    dispatch(setWorkingtimelistData(initializeWorkingTimeListResult()));
  }, [dispatch, productionProgramm]);

  return { sellwish, selldirect, orderlist, productionlist, workingtimelist };
};
