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

const initState = {
  periods:
    localStorage.getItem("periods") !== null
      ? JSON.parse(localStorage.getItem("periods"))
      : [],
  dataRadar:
    localStorage.getItem("dataRadar") !== null
      ? JSON.parse(localStorage.getItem("dataRadar"))
      : undefined,
  requiredCredits:
    localStorage.getItem("requiredCredits") !== null
      ? JSON.parse(localStorage.getItem("requiredCredits"))
      : undefined
};

const periodReducer = (state = initState, action) => {
  let period;
  let allPeriods;
  // localStorage.setItem("periods", JSON.stringify(state.periods));
  // localStorage.setItem("requiredCredits", JSON.stringify(state.periods));
  switch (action.type) {
    //add course to period
    case "ADD_PERIOD":
      period = newPeriod(action.period);
      localStorage.setItem(
        "periods",
        JSON.stringify([...state.periods, period])
      );
      return {
        ...state,
        periods: [...state.periods, period]
      };
    case "CALCULATE_ALL":
      const { periods, dataRadar } = calculateAll(state.periods);
      localStorage.setItem("periods", JSON.stringify(periods));
      localStorage.setItem("dataRadar", JSON.stringify(dataRadar));
      return {
        ...state,
        dataRadar: dataRadar,
        periods: periods
      };
    case "SET_PERIODS":
      localStorage.setItem("periods", JSON.stringify(action.periods));
      return {
        ...state,
        periods: action.periods
      };
    case "DELETE_COURSE":
      allPeriods = [...state.periods];
      period = allPeriods[action.indexPeriod];
      period.courses = period.courses.filter(item => item[1] !== action.code);

      allPeriods[action.indexPeriod] = { ...period };
      localStorage.setItem("periods", JSON.stringify(allPeriods));
      return {
        ...state,
        periods: allPeriods
      };
    case "ADD_COURSE":
      allPeriods = [...state.periods];
      period = allPeriods[action.indexPeriod];
      period.courses.push(action.course);

      allPeriods[action.indexPeriod] = { ...period };
      localStorage.setItem("periods", JSON.stringify(allPeriods));
      return {
        ...state,
        periods: allPeriods
      };
    case "SET_CREDITS":
      localStorage.setItem(
        "requiredCredits",
        JSON.stringify(action.requiredCredits)
      );
      console.log("test:" , action.requiredCredits)
      return {
        ...state,
        requiredCredits: action.requiredCredits
      };
    default:
      return {
        ...state
      };
  }
};
export default periodReducer;
