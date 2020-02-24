// import { data } from "../../helpers/datatest"; //Periods
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
  periods: []
};

const periodReducer = (state = periods, action) => {
  let period;
  switch (action.type) {
    //add course to period
    case "ADD_PERIOD":
      period = newPeriod(action.period);
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
    case "SET_PERIODS":
      return {
        ...state,
        periods: action.periods
      };
    case "DELETE_COURSE":
      let allPeriods = [...state.periods];
      period = allPeriods[action.indexPeriod];
      period.courses = period.courses.filter(item => item[1] !== action.code);

      allPeriods[action.indexPeriod] = {...period};
      return {
        ...state,
        periods: allPeriods
      };
    default:
      return {
        ...state
      };
  }
};
export default periodReducer;
