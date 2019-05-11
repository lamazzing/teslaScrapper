import { combineReducers } from "redux";
import teslas from "./teslas/reducer";

const appReducer = combineReducers({
  teslas
});

export default appReducer;
