const ADD_COURSE = "ADD_COURSE";
const ADD_PERIOD = "ADD_PERIOD";
const CALCULATE_ALL = "CALCULATE_ALL";
export function addCourse(index, course) {
  return {
    type: ADD_COURSE,
    course: course,
    index: index
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
