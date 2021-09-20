import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store, { actionType } from "../store/store";
import worker_script from "./workers/worker";
import worker_script_resume from "./workers/worker_resume";
let myWorker = null;
let myWorker_resume = null;
const axios = require("axios");

// myWorker.postMessage("im from main");
// const eventHandler = (e) => {
//   setInterval(() => {
//     myWorker.postMessage("Button pressed, everything fine!");
//     myWorker.postMessage("hello from worker 2");
//     console.log("Message posted to worker,worker2");
//   }, 1000);
// };
const Timer = (props) => {
  // let [activityName, setActivityName] = useState("");
  // const userData = useSelector((store) => store.userData);
  // let activityName = useSelector((store) => store.activity_name);
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  // const [time, setTime] = useState("00:00:00");
  const [isCount, setIsCount] = useState(false);
  const handleInput = (event) => {
    // setActivityName(event.target.value);
    dispatch({
      type: actionType.SET_ACTIVITY_NAME,
      payload: event.target.value,
    });
  };
  const timeFormatToSeconds = () => {
    // let splitted = time.split(":");
    let splitted = store.actual_time.split(":");
    let [hours, minutes, seconds] = splitted;
    return hours * 3600 + minutes * 60 + seconds;
  };
  const createUserRequest = async () => {
    let body = Object.assign(store.userData);
    console.log("test-test", store.activity_name);
    body.activity_name = store.activity_name;
    body.activity_time = timeFormatToSeconds();
    body.activity_userId = store.userData.id;
    console.log("body", body);
    let result = await axios.post("http://localhost:8080/timer/time", body);
    console.log("result", result);
  };
  const eventStart = () => {
    setIsCount(true);
    myWorker = new Worker(worker_script);
    myWorker.onmessage = (m) => {
      console.log("msg from worker: ", m.data);
      localStorage.setItem("Time", m.data);
      // setTime(m.data);
      dispatch({ type: actionType.SET_ACTUAL_TIME, payload: m.data });
      dispatch({ type: actionType.TOGGLE_IS_TIMER_WORKS, payload: true });
    };
  };
  const eventStop = () => {
    setIsCount(false);
    myWorker?.terminate();
    myWorker_resume?.terminate();
    //СЕЙЧАС БУДУ УДАЛЯТЬ СО СТОРА
    localStorage.removeItem("Time");
    localStorage.removeItem("Resume_time");
    // dispatch({ type: actionType.STOP_TIME, payload: time }); //запись финального времени, готового к отправке, полная перезапись
    dispatch({ type: actionType.STOP_TIME, payload: store.actual_time });
    createUserRequest();
    // setTime("00:00:00");
    dispatch({ type: actionType.SET_ACTUAL_TIME, payload: "00:00:00" });
    dispatch({ type: actionType.SET_ACTIVITY_NAME });
    dispatch({ type: actionType.TOGGLE_IS_TIMER_WORKS });
  };
  const eventPause = () => {
    // dispatch({ type: actionType.PAUSE_TIME, payload: time });
    dispatch({ type: actionType.PAUSE_TIME, payload: store.actual_time });
    myWorker?.terminate();
    myWorker_resume?.terminate();
  };
  const eventResume = async () => {
    const temp = await store
      .getState()
      .pause_time.split(":")
      .map(function (item) {
        return parseInt(item, 10);
      });
    const handledData = (temp[0] * 3600 + temp[1] * 60 + temp[2]) * 1000;
    console.log("handledData", handledData);
    // localStorage.setItem("Resume_time",handledData)
    myWorker_resume = new Worker(worker_script_resume);
    myWorker_resume.postMessage(handledData);
    myWorker_resume.onmessage = (m) => {
      console.log("msg from worker_resume: ", m.data);
      localStorage.setItem("Time", m.data);
      // setTime(m.data);
      dispatch({ type: actionType.SET_ACTUAL_TIME, payload: m.data });
    };
  };

  return (
    <div className="content">
      <div className="Time">{store.actual_time}</div>
      <input onChange={handleInput} value={store.activity_name} />
      <div>
        <button
          onClick={eventStart}
          disabled={!store.isTimerWorks && store.activity_name === ""}
        >
          start
        </button>
        <button onClick={eventStop} disabled={!store.isTimerWorks}>
          stop
        </button>
        <button onClick={eventPause} disabled={!store.isTimerWorks}>
          pause
        </button>
        <button onClick={eventResume} disabled={store.isTimerWorks}>
          resume
        </button>
      </div>
    </div>
  );
};

export default Timer;
