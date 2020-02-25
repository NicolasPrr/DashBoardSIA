const ADD_COURSE = "ADD_COURSE";
const DELETE_COURSE = "DELETE_COURSE";
const ADD_PERIOD = "ADD_PERIOD";
const CALCULATE_ALL = "CALCULATE_ALL";
const SET_PERIODS = "SET_PERIODS";
const SET_CREDITS = "SET_CREDITS";
export function addCourse(index, course) {
  return {
    type: ADD_COURSE,
    indexPeriod: index,
    course: course
  };
}
export function deleteCourse(indexPeriod, code) {
  return {
    type: DELETE_COURSE,
    indexPeriod: indexPeriod,
    code: code
  };
}
export function addPeriod(period) {
  return {
    type: ADD_PERIOD,
    period: period
  };
}
export function calculateAll() {
  return {
    type: CALCULATE_ALL
  };
}
export function setPeriods(periods) {
  return {
    type: SET_PERIODS,
    periods: periods
  };
}
export function setCredits(credits) {
  return {
    type: SET_CREDITS,
    requiredCredits: credits
  };
}
