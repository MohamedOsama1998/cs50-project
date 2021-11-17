import { combineReducers } from "redux";
import { themeReducer } from "./themeReducer";

export const rootReducer = combineReducers({
  themeReducer: themeReducer,
});