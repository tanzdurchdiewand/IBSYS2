import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";

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

// Async Thunks
// ----------------------------------------------------------------------------
export const setEntityId = (entityId: string | null): AppThunk => {
  return (dispatch) => {
    dispatch(setActiveEntityId(entityId));
  };
};
