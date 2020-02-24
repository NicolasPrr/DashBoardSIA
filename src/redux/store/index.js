import { createStore, applyMiddleware, compose } from "redux";
import PeriodReducer from "../reducers/period";

const logger = store => next => action => {
  console.log("Log action:", action);
  next(action);
  if (action.type === "DELETE_COURSE") {
    store.dispatch({
      type: "CALCULATE_ALL"
    });
  }
};

export default createStore(
  PeriodReducer,
  compose(
    applyMiddleware(logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
