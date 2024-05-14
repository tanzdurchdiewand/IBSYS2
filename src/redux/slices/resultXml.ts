import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  OrderList,
  ProductionList,
  Selldirect,
  Sellwish,
  WorkingTimeList,
} from "../../types/resultTypes";

type ResultXmlState = {
  sellwish: Sellwish | null;
  selldirect: Selldirect | null;
  orderlist: OrderList | null;
  productionlist: ProductionList | null;
  workingtimelist: WorkingTimeList | null;
};

const initialState: ResultXmlState = {
  sellwish: null,
  selldirect: null,
  orderlist: null,
  productionlist: null,
  workingtimelist: null,
};

const resultXmlSlice = createSlice({
  name: "resutlXml",
  initialState,
  reducers: {
    setSellwishData: (state, action: PayloadAction<Sellwish>) => {
      state.sellwish = action.payload;
    },
    setSelldirectData: (state, action: PayloadAction<Selldirect>) => {
      state.selldirect = action.payload;
    },
    setOrderlistData: (state, action: PayloadAction<OrderList>) => {
      state.orderlist = action.payload;
    },
    setProductionlistData: (state, action: PayloadAction<ProductionList>) => {
      state.productionlist = action.payload;
    },
    setWorkingtimelistData: (state, action: PayloadAction<WorkingTimeList>) => {
      state.workingtimelist = action.payload;
    },
  },
});

export const {
  setSellwishData,
  setSelldirectData,
  setOrderlistData,
  setProductionlistData,
  setWorkingtimelistData,
} = resultXmlSlice.actions;

export default resultXmlSlice.reducer;
