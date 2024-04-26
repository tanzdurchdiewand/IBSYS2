import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  P1Planning,
  P2Planning,
  P3Planning,
} from "../../types/materialPlanningTypes";

type PlanningState = {
  initialPlanning: P1Planning | P2Planning | P3Planning | null;
};

const initialState: PlanningState = {
  initialPlanning: null,
};

const planningSlice = createSlice({
  name: "planning",
  initialState,
  reducers: {
    setInitialPlanning(
      state,
      action: PayloadAction<P1Planning | P2Planning | P3Planning>
    ) {
      state.initialPlanning = action.payload;
    },
    updateAndRecalculatePlanning(
      state,
      action: PayloadAction<P1Planning | P2Planning | P3Planning>
    ) {
      state.initialPlanning = action.payload;
    },
  },
});

export const { setInitialPlanning, updateAndRecalculatePlanning } =
  planningSlice.actions;
export default planningSlice.reducer;
