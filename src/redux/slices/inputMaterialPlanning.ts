import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Planning } from "../../types/materialPlanningTypes";

type PlanningState = {
  initialPlanning: Planning | null;
};

const initialState: PlanningState = {
  initialPlanning: null,
};

const planningSlice = createSlice({
  name: "planning",
  initialState,
  reducers: {
    setInitialPlanning(state, action: PayloadAction<Planning>) {
      state.initialPlanning = action.payload;
    },
    updateAndRecalculatePlanning(state, action: PayloadAction<Planning>) {
      state.initialPlanning = action.payload;
    },
  },
});

export const { setInitialPlanning, updateAndRecalculatePlanning } =
  planningSlice.actions;
export default planningSlice.reducer;
