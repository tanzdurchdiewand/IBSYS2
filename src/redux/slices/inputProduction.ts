// Import the necessary functions and types from Redux Toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductionProgramm } from "../../types/productionPlanningTypes";

export type AsyncCallStatus = "idle" | "loading" | "succeeded" | "failed";

export type InputProductionData = {
  status: {
    fetch: AsyncCallStatus;
  };
  error: {
    fetch: Error | string | null;
  };
  productionProgramm: ProductionProgramm | null;
};

type InputProductionDataState = {
  list: InputProductionData;
};

export const initialState: InputProductionDataState = {
  list: {
    status: {
      fetch: "idle",
    },
    error: {
      fetch: null,
    },
    productionProgramm: null,
  },
};

const slice = createSlice({
  name: "inputXML",
  initialState,
  reducers: {
    setProductionProgramm(state, action: PayloadAction<ProductionProgramm>) {
        state.list.productionProgramm = action.payload
    },
  },
});

export default slice.reducer;
export const { setProductionProgramm } = slice.actions;
