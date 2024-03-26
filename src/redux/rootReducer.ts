import { appReducer } from "./appReducer";
import storage, { KEY_PREFIX } from "./storage";
import { AnyAction } from "redux";

// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: "root",
  whitelist: [], // Allow slices to be persistent or delete to persist all slices.
  storage,
  keyPrefix: KEY_PREFIX,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === "RESET") {
    Object.keys(state).forEach((key) => {
      storage.removeItem(`${KEY_PREFIX}${key}`);
    });
    state = undefined;
  }
  return appReducer(state, action);
};
