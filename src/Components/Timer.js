import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionType } from "../store/store";
import {
  Dropdown,
  InputGroup,
  DropdownButton,
  FormControl,
} from "react-bootstrap";
import worker_script from "./workers/worker";
import worker_script_resume from "./workers/worker_resume";
import styles from "../CssModules/Timer.module.css";
let myWorker = null;
let myWorker_resume = null;
const axios = require("axios");
const Timer = (props) => {
  const [dispatchedActionName, setDispatchedActionName] = useState();
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const handleInput = (event) => {
    dispatch({
      type: actionType.SET_ACTIVITY_NAME,
      payload: event.target.value,
    });
  };

  const timeFormatToSeconds = () => {
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
    myWorker = new Worker(worker_script);
    myWorker.onmessage = (m) => {
      // setIsRed(reverseRed());
      console.log("msg from worker: ", m.data);
      localStorage.setItem("Time", m.data);
      // setTime(m.data);
      dispatch({ type: actionType.SET_ACTUAL_TIME, payload: m.data });
      dispatch({ type: actionType.TOGGLE_IS_TIMER_WORKS, payload: true });
      dispatch({ type: actionType.SET_IS_RED });
    };
  };
  const eventStop = () => {
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
    dispatch({ type: actionType.TOGGLE_IS_TIMER_PAUSED, payload: false });
    dispatch({ type: actionType.SET_IS_RED, payload: false });
  };
  const eventPause = () => {
    // dispatch({ type: actionType.PAUSE_TIME, payload: time });
    dispatch({ type: actionType.PAUSE_TIME, payload: store.actual_time });
    dispatch({ type: actionType.TOGGLE_IS_TIMER_PAUSED, payload: true });
    myWorker?.terminate();
    myWorker_resume?.terminate();
  };
  const eventResume = async () => {
    const temp = await store.pause_time.split(":").map(function (item) {
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
    <div className="wrapper">
      <div className="content">
        <InputGroup className={styles.input_half}>
          <DropdownButton
            variant="primary"
            title="Actions"
            id="input-group-dropdown-1"
          >
            {store.activitiesDistinct.map((el, idx = 0) => {
              console.log("huy", el);
              ++idx;
              return (
                <Dropdown.Item
                  key={idx}
                  onClick={() => {
                    dispatch({
                      type: actionType.SET_ACTIVITY_NAME,
                      payload: el.activity_name,
                    });
                  }}
                >
                  {el.activity_name}
                </Dropdown.Item>
              );
            })}
            {/* <Dropdown.Item href="#">Action</Dropdown.Item>
            <Dropdown.Item href="#">Another action</Dropdown.Item>
            <Dropdown.Item href="#">Something else here</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#">Separated link</Dropdown.Item> */}
          </DropdownButton>
          <FormControl
            aria-label="Text input with dropdown button"
            onChange={handleInput}
            value={store.activity_name}
            placeholder="Enter activity name to start!"
          />
        </InputGroup>
        {/* <input
        onChange={handleInput}
        value={store.activity_name}
        placeholder="Enter activity name to start!"
        className={styles.input_half}
      /> */}
        <div className={styles.block}>
          <div className={store.isRed ? styles.dot_active : styles.dot}></div>
          <div className={styles.watchUpperWrapper}>
            <div className={styles.Time}>{store.actual_time}</div>
          </div>
          <hr
            style={{
              color: "black",
              backgroundColor: "black",
              height: 5,
              outline: "2px #a7a6a6",
              outlineStyle: "inset",
              marginTop: "0px",
            }}
          />
          <div className={styles.buttons}>
            {/* <button
          onClick={eventStart}
          disabled={store.activity_name === "" || store.isTimerWorks}
        >
          start
        </button>
                <button onClick={eventStop} disabled={!store.isTimerWorks}>
          stop
        </button>
        <button onClick={eventPause} disabled={!store.isTimerWorks}>
          pause
        </button>
        <button onClick={eventResume} disabled={!store.isTimerPaused}>
          resume
        </button> */}
            <button
              type="button"
              className="btn btn-success"
              onClick={eventStart}
              disabled={store.activity_name === "" || store.isTimerWorks}
            >
              Start
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={eventStop}
              disabled={!store.isTimerWorks}
            >
              Stop
            </button>
            <button
              type="button"
              className="btn btn-warning"
              onClick={eventPause}
              disabled={!store.isTimerWorks}
            >
              Pause
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={eventResume}
              disabled={!store.isTimerPaused}
            >
              Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
