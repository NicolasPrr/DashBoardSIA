import { data } from "../../helpers/datatest"; //Periods
import { calculateAll } from "../../helpers/process";

function newPeriod(name) {
  return {
    name: name,
    courses: [],
    PAPA: "",
    PAPPI: "",
    PA: ""
  };
}

const periods = {
  periods: data
};

const periodReducer = (state = periods, action) => {
  switch (action.type) {
    //add course to period
    case "ADD_PERIOD":
      const period = newPeriod(action.period);
      return {
        ...state,
        periods: [...state.periods, period]
      };
    case "CALCULATE_ALL":
      const { periods, dataRadar } = calculateAll(state.periods);
      return {
        ...state,
        dataRadar: dataRadar,
        periods: periods
      };
    default:
      return {
        ...state
      };
  }
};
export default periodReducer;
