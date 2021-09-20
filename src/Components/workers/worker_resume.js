const workercode = function () {
  let receivedTimeInMs = null;
  onmessage = (e) => {
    receivedTimeInMs = e.data;
    start();
  };
  // let interval = null;
  function myTimer(d0) {
    // get current time every second
    let d = new Date().valueOf();
    let diff = d - d0;
    let hours = Math.floor(diff / 1000 / 60 / 60);
    let minutes = Math.floor(diff / 1000 / 60) - 60 * hours;
    let seconds = Math.floor(diff / 1000) - (hours * 3600 + minutes * 60);

    hours = hours.toString();
    if (hours.length === 1) {
      hours = "0" + hours;
    }
    minutes = minutes.toString();
    if (minutes.length === 1) {
      minutes = "0" + minutes;
    }
    seconds = seconds.toString();
    if (seconds.length === 1) {
      seconds = "0" + seconds;
    }
    postMessage(hours + ":" + minutes + ":" + seconds);
  }

  let start = () => {
    console.log("started!!", receivedTimeInMs);
    // get current time
    let d0 = new Date().valueOf() - receivedTimeInMs;
    // repeat myTimer(d0) every 100 ms
    setInterval(function () {
      myTimer(d0);
    }, 1000);
    // timer should not start anymore since it has been started
    // timerStart = false;
  };
};
let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));
const blob = new Blob([code], { type: "application/javascript" });
const worker_script = URL.createObjectURL(blob);
export default worker_script;
