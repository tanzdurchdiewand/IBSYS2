// Import the necessary functions and types from Redux Toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameData } from "../../types/types";
import { AppThunk } from "../store";
export type AsyncCallStatus = "idle" | "loading" | "succeeded" | "failed";

export type InputXMLData = {
  status: {
    fetch: AsyncCallStatus;
  };

  error: {
    fetch: Error | string | null;
  };

  XML: GameData | null;
};

type InputXMLDataState = {
  list: InputXMLData;
};

export const initialState: InputXMLDataState = {
  list: {
    status: {
      fetch: "idle",
    },
    error: {
      fetch: null,
    },
    XML: null,
  },
};

const slice = createSlice({
  name: "inputXMLData",
  initialState,
  reducers: {
    // List
    inputXMLUploadStarted(state) {
      state.list.status.fetch = "loading";
    },
    inputXMLUploadFailed(state, action) {
      state.list.status.fetch = "failed";
      state.list.error.fetch = action.payload;
    },
    inputXMLUploadSucceeded(state, action: PayloadAction<GameData>) {
      state.list.status.fetch = "succeeded";
      state.list.XML = action.payload;
    },
  },
});

export default slice.reducer;

export const uploadInputXML = (input: GameData): AppThunk => {
  return async (dispatch) => {
    dispatch(slice.actions.inputXMLUploadStarted());

    let data: GameData | null = null;

    console.log(input);
  };
};
