import {
  DirectSell,
  ProductionProgramm,
} from "../../types/productionPlanningTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ProductionProgrammState {
  data: ProductionProgramm | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductionProgrammState = {
  data: null,
  loading: false,
  error: null,
};

const productionProgrammSlice = createSlice({
  name: "ProductionProgramm",
  initialState,
  reducers: {
    setProductionProgramm(state, action: PayloadAction<ProductionProgramm>) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setDirectSell(state, action: PayloadAction<DirectSell>) {
      if (state.data) {
        state.data.directSell = action.payload;
      }
    },
    updateForecastProductionProgramm(
      state,
      action: PayloadAction<ProductionProgramm>
    ) {
      state.data = action.payload;
    },
    updateProductionProgramm(
      state,
      action: PayloadAction<{
        part: keyof ProductionProgramm;
        category: string;
        key: string;
        value: number;
      }>
    ) {
      if (state.data) {
        const { part, category, key, value } = action.payload;
        const item = state.data[part];
        if (item && typeof item !== "string") {
          if (category) {
            const categoryItem = item[category as keyof typeof item];
            if (
              categoryItem &&
              typeof categoryItem === "object" &&
              !((categoryItem as any) instanceof Array)
            ) {
              (categoryItem as any)[key] = value;
            }
          } else {
            // If category is null, we assume that the key is a direct property of the part
            (item as any)[key] = value;
          }
        }
      }
    },
    startLoading(state) {
      state.loading = true;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setProductionProgramm,
  setDirectSell,
  updateProductionProgramm,
  updateForecastProductionProgramm,
} = productionProgrammSlice.actions;

export default productionProgrammSlice.reducer;
