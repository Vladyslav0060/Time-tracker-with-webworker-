import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
export const actionType = {
  TOGGLE_LOGIN: "TOGGLE_LOGIN",
  TOGGLE_IS_TIMER_WORKS: "TOGGLE_IS_TIMER_WORKS",
  TOGGLE_IS_TIMER_PAUSED: "TOGGLE_IS_TIMER_PAUSED",
  TOGGLE_LOGIN_PAGE: "TOGGLE_LOGIN_PAGE",
  PAUSE_TIME: "PAUSE_TIME",
  STOP_TIME: "STOP_TIME",
  SET_USERDATA: "SET_USERDATA",
  SET_ACTIVITY_NAME: "SET_ACTIVITY_NAME",
  SET_ACTUAL_TIME: "SET_ACTUAL_TIME",
  SET_IS_RED: "SET_IS_RED",
  SET_ACTIVITIES_DISTINCT: "SET_ACTIVITIES_DISTINCT",
};

const initState = {
  isLoggedIn: false,
  isTimerWorks: false,
  isTimerPaused: false,
  toggle_login_page: true,
  actual_time: "00:00:00",
  pause_time: null,
  stop_time: null,
  userData: {},
  activity_name: "",
  isRed: false,
  activitiesDistinct: [],
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
    case actionType.TOGGLE_IS_TIMER_PAUSED:
      return {
        ...state,
        isTimerPaused: action.payload || !state.isTimerPaused,
      };
    case actionType.TOGGLE_LOGIN_PAGE:
      return {
        ...state,
        toggle_login_page: action.payload || !state.toggle_login_page,
      };
    case actionType.SET_ACTUAL_TIME:
      return {
        ...state,
        actual_time: action.payload || state.actual_time,
      };
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
    case actionType.SET_IS_RED:
      return {
        ...state,
        isRed: action.payload || !state.isRed,
      };
    case actionType.SET_ACTIVITIES_DISTINCT:
      return {
        ...state,
        activitiesDistinct: action.payload,
      };
    default:
      return state;
  }
};

//create store
const store = createStore(counter, applyMiddleware(logger));
window.store = store;

export default store;
