import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
export const actionType = {
  TOGGLE_LOGIN: "TOGGLE_LOGIN",
  TOGGLE_IS_TIMER_WORKS: "TOGGLE_IS_TIMER_WORKS",
  PAUSE_TIME: "PAUSE_TIME",
  STOP_TIME: "STOP_TIME",
  SET_USERDATA: "SET_USERDATA",
  SET_ACTIVITY_NAME: "SET_ACTIVITY_NAME",
  SET_ACTUAL_TIME:'SET_ACTUAL_TIME'
};

const initState = {
  isLoggedIn: false,
  isTimerWorks: false,
  actual_time:'00:00:00',
  pause_time: null,
  stop_time: null,
  userData: {},
  activity_name: "",
};

// REDUCER
const counter = (state = initState, action) => {
  switch (action.type) {
    case actionType.TOGGLE_LOGIN:
      return {
        ...state,
        isLoggedIn: !state.isLoggedIn,
      };
    case actionType.TOGGLE_IS_TIMER_WORKS:
      return {
        ...state,
        isTimerWorks: action.payload || !state.isTimerWorks,
      };
    case actionType.SET_ACTUAL_TIME:
      return{
        ...state,
        actual_time: action.payload || state.actual_time
      }
    case actionType.PAUSE_TIME:
      return {
        ...state,
        pause_time: action.payload,
      };
    case actionType.STOP_TIME:
      return {
        ...state,
        stop_time: action.payload,
      };
    case actionType.SET_USERDATA:
      return {
        ...state,
        userData: action.payload,
      };
    case actionType.SET_ACTIVITY_NAME:
      return {
        ...state,
        activity_name: action.payload || "",
      };
    default:
      return state;
  }
};

//create store
const store = createStore(counter, applyMiddleware(logger));
window.store = store;

export default store;
