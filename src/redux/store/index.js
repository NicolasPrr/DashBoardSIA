import { createStore } from "redux";
import PeriodReducer from "../reducers/period";

export default createStore(
  PeriodReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
