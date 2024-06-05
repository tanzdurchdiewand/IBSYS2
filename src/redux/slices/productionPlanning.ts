// Import the necessary functions and types from Redux Toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ProductionPlan,
  ProductionPlanTimesTotalStore,
} from "../../types/productionPlanningTypes";

export type AsyncCallStatus = "idle" | "loading" | "succeeded" | "failed";

export type productionPlanningData = {
  status: {
    fetch: AsyncCallStatus;
  };
  error: {
    fetch: Error | string | null;
  };
  productionPlan: ProductionPlanTimesTotalStore | null;
};

type productionPlanningDataState = {
  list: productionPlanningData;
};

export const initialState: productionPlanningDataState = {
  list: {
    status: {
      fetch: "idle",
    },
    error: {
      fetch: null,
    },
    productionPlan: null,
  },
};

const slice = createSlice({
  name: "inputXML",
  initialState,
  reducers: {
    setProductionPlan: (
      state,
      action: PayloadAction<ProductionPlanTimesTotalStore>
    ) => {
      state.list.productionPlan = action.payload;
    },
  },
});

export default slice.reducer;
export const { setProductionPlan } = slice.actions;
