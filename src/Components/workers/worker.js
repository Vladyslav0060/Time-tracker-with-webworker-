const workercode = () => {
  let timerStart = true;
  function myTimer(d0) {
    // get current time
    let d = new Date().valueOf();
    // calculate time difference between now and initial time
    let diff = d - d0;
    // calculate number of minutes
    let hours = Math.floor(diff / 1000 / 60 / 60);
    let minutes = Math.floor(diff / 1000 / 60) - 60 * hours;
    // calculate number of seconds
    let seconds = Math.floor(diff / 1000) - (hours * 3600 + minutes * 60);

    // if number of minutes less than 10, add a leading "0"
    hours = hours.toString();
    if (hours.length === 1) {
      hours = "0" + hours;
    }
    minutes = minutes.toString();
    if (minutes.length === 1) {
      minutes = "0" + minutes;
    }
    // if number of seconds less than 10, add a leading "0"
    seconds = seconds.toString();
    if (seconds.length === 1) {
      seconds = "0" + seconds;
    }
    // return output to Web Worker
    postMessage(hours + ":" + minutes + ":" + seconds);
  }

  if (timerStart) {
    // get current time
    let d0 = new Date().valueOf();
    // repeat myTimer(d0) every 100 ms
    setInterval(function () {
      myTimer(d0);
    }, 1000);
    // timer should not start anymore since it has been started
    timerStart = false;
  }
  // onmessage = function(e) {
  //     console.log('WORKER 2 Message received from main script');
  //     let workerResult = 'Received from main: ' + (e.data);
  //     console.log('WORKER 2 Posting message back to main script');
  //     postMessage(workerResult);
  // }
};

let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const worker_script = URL.createObjectURL(blob);

export default worker_script;
