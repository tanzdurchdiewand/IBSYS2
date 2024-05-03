// Import the necessary functions and types from Redux Toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MaterialOrderPlanning } from "../../types/orderPlanningTypes";

type InputOrderDataState = {
  orderPlanning: MaterialOrderPlanning | null;
};

export const initialState: InputOrderDataState = {
  orderPlanning: null,
};

const slice = createSlice({
  name: "inputOrder",
  initialState,
  reducers: {
    setOrderPlanning(state, action: PayloadAction<MaterialOrderPlanning>) {
      state.orderPlanning = action.payload;
    },
    updateOrderPlanning(state, action: PayloadAction<MaterialOrderPlanning>) {
      state.orderPlanning = action.payload;
    },
  },
});

export default slice.reducer;
export const { setOrderPlanning, updateOrderPlanning } = slice.actions;
