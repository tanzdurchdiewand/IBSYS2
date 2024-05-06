import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CapacityPlanningTable,
  SummaryTable,
} from "../../types/capacityPlanningTypes";
import { RootState } from "../store";

interface CapacityPlanningState {
  capacityRows: CapacityPlanningTable;
  summaryRows: SummaryTable;
}

const initialState: CapacityPlanningState = {
  capacityRows: [],
  summaryRows: [],
};

const capacityPlanningSlice = createSlice({
  name: "capacityPlanning",
  initialState,
  reducers: {
    setCapacityPlanningData: (
      state,
      action: PayloadAction<CapacityPlanningTable>
    ) => {
      state.capacityRows = action.payload;
    },
    setSummaryData: (state, action: PayloadAction<SummaryTable>) => {
      state.summaryRows = action.payload;
    },
    updateCapacityPlanningRow: (
      state,
      action: PayloadAction<{ index: number; values: number[] }>
    ) => {
      state.summaryRows[action.payload.index].values = action.payload.values;
    },
  },
});

export const {
  setCapacityPlanningData,
  setSummaryData,
  updateCapacityPlanningRow,
} = capacityPlanningSlice.actions;
export const selectCapacityPlanningData = (state: RootState) =>
  state.inputCapacityPlanning.capacityRows;

export const selectSummaryRows = (state: RootState) =>
  state.inputCapacityPlanning.summaryRows;

export default capacityPlanningSlice.reducer;
