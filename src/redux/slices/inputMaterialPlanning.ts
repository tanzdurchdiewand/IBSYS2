import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  MaterialPlanningRow,
  P1Planning,
  P2Planning,
  P3Planning,
} from "../../types/materialPlanningTypes";

type PlanningState = {
  initialPlanning: P1Planning | P2Planning | P3Planning | null;
};

type UpdateFieldPayload = {
  key: string;
  field: keyof MaterialPlanningRow;
  value: number;
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
    updatePlanningField(state, action: PayloadAction<UpdateFieldPayload>) {
      const { key, field, value } = action.payload;
      if (state.initialPlanning && key in state.initialPlanning) {
        state.initialPlanning[key][field] = value;
      }
    },
  },
});

export const { setInitialPlanning, updatePlanningField } = planningSlice.actions;
export default planningSlice.reducer;
