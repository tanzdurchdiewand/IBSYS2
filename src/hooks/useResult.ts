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

export const useResult = () => {
  const dispatch = useDispatch();

  const productionProgramm = useSelector(
    (state: RootState) => state.inputProductionProgramm.data
  );

  const orderPlanning = useSelector(
    (state: RootState) => state.inputOrderPlanning.data
  );

  const capacitySummaryRows = useSelector(
    (state: RootState) => state.inputCapacityPlanning.summaryRows
  );
  console.log(capacitySummaryRows);
  const productionPlan = useSelector(
    (state: RootState) => state.productionPlanning.list.productionPlan
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
    dispatch(setSellwishData(initializeSellWishResult(productionProgramm!)));
    dispatch(
      setSelldirectData(initializeSellDirectResult(productionProgramm!))
    );
    dispatch(setOrderlistData(initializeOrderListResult(orderPlanning!)));
    dispatch(
      setWorkingtimelistData(
        initializeWorkingTimeListResult(capacitySummaryRows)
      )
    );
    // TODO Data still Mocked
    dispatch(
      setProductionlistData(initializeProductionListResult(productionPlan!))
    );
    // dispatch(setProductionlistData(productionlist!));
  }, [dispatch, productionProgramm, orderPlanning, capacitySummaryRows]);

  return { sellwish, selldirect, orderlist, productionlist, workingtimelist };
};
