import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { MaterialOrderPlanning, OrderPlanningRow } from '../../types/orderPlanningTypes';

interface OrderPlanningState {
  data: MaterialOrderPlanning | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderPlanningState = {
  data: null,
  loading: false,
  error: null,
};

const orderPlanningSlice = createSlice({
  name: 'orderPlanning',
  initialState,
  reducers: {
    setOrderPlanning(state, action: PayloadAction<MaterialOrderPlanning>) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateOrderPlanning(state, action: PayloadAction<{ key: string; field: keyof OrderPlanningRow; value: number }>) {
      if (state.data && action.payload.key in state.data) {
        const row = state.data[action.payload.key];
        (row[action.payload.field] as number) = action.payload.value;
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

export const { setOrderPlanning, updateOrderPlanning, startLoading, setError } = orderPlanningSlice.actions;

export const selectOrderPlanning = (state: RootState) => state.inputOrderPlanning.data;

export default orderPlanningSlice.reducer;
