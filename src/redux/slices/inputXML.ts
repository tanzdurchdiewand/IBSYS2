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
  step: number;
  XML: GameData | null;
  fileName: string;
  fileSelected: boolean;
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
    step: 0,
    XML: null,
    fileName: "",
    fileSelected: false,
  },
};

const slice = createSlice({
  name: "inputXML",
  initialState,
  reducers: {
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
    setStepper(state, action: PayloadAction<number>) {
      state.list.step += action.payload;
    },
    setFileName(state, action: PayloadAction<string>) {
      state.list.fileName = action.payload;
    },
    setFileSelected(state, action: PayloadAction<boolean>) {
      state.list.fileSelected = action.payload;
    }
  },
});

export default slice.reducer;
export const { setStepper, setFileName, setFileSelected, } = slice.actions;

export const uploadInputXML = (input: GameData): AppThunk => {
  return async (dispatch) => {
    dispatch(slice.actions.inputXMLUploadStarted());

    try {
      dispatch(slice.actions.inputXMLUploadSucceeded(input));
    } catch (error) {
      dispatch(slice.actions.inputXMLUploadFailed(error));
    }
  };
};
