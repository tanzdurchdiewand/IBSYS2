import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";
import { MaterialOrderPlanning } from "../../types/orderPlanningTypes";
import { setOrderPlanning } from "./inputOrderPlanning";
import { GameData } from "../../types/inputXMLTypes";
import { ProductionProgramm } from "../../types/productionPlanningTypes";
import { initializeOrderPlanning } from "../../businessLogic/orderPlanning";

// ----------------------------------------------------------------------------

type State = {
  activeEntityId: string | null | undefined;
};

const initialState: State = {
  activeEntityId: undefined,
};

// ----------------------------------------------------------------------------

const slice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setActiveEntityId(state, action: PayloadAction<string | null>) {
      state.activeEntityId = action.payload;
    },
  },
});

export default slice.reducer;

export const { setActiveEntityId } = slice.actions;

// Functions
// ----------------------------------------------------------------------------

// Selectors
// ----------------------------------------------------------------------------

export const selectAllOrders = createSelector(
  (state: RootState) => state.inputOrderPlanning.data,
  (data) => data
);

// Async Thunks
// ----------------------------------------------------------------------------
export const setEntityId = (entityId: string | null): AppThunk => {
  return (dispatch) => {
    dispatch(setActiveEntityId(entityId));
  };
};

export const fetchInitialOrderPlanning = createAsyncThunk<MaterialOrderPlanning, void, { state: RootState }>(
  'orderPlanning/fetchInitial',
  async (_, { getState, dispatch }) => {
    const { inputXML, inputProduction } = getState();
    const gameData = inputXML.list.XML;
    const productionProgramm = inputProduction.list.productionProgramm;

    console.log("gamedata", gameData);

    if (!gameData || !productionProgramm) {
      throw new Error('Missing required data for initialization');
    }

    const orderData = initializeOrderPlanning(gameData, productionProgramm!);
    dispatch(setOrderPlanning(orderData));
    return orderData;
  }
);
