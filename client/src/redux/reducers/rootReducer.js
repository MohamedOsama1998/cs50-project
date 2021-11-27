import { combineReducers } from "redux";
import { themeReducer } from "./themeReducer";
import { authReducer } from "./authReducer";
import { tasksReducer } from "./tasksReducer";
import { snackBarReducer } from "./snackBarReducer";

export const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  tasks: tasksReducer,
  snackbar: snackBarReducer,
});
