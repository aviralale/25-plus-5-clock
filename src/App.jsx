import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import beepAudio from "./assets/audio/beep.mp3";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [intervalId, setIntervalId] = useState(null);
  useEffect(() => {
    setTimeLeft(sessionLength * 60);
  }, [sessionLength]);
  const incrementBreak = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };
  const decrementBreak = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };
  const incrementSession = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
    }
  };
  const decrementSession = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
    }
  };
  const reset = () => {
    clearInterval(intervalId);
    setIsRunning(false);
    setIsSession(true);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    const beep = document.getElementById("beep");
    beep.pause();
    beep.currentTime = 0;
  };
  const tick = () => {
    setTimeLeft((prev) => {
      if (prev === 0) {
        const beep = document.getElementById("beep");
        beep.play();
        if (isSession) {
          setIsSession(false);
          return breakLength * 60;
        } else {
          setIsSession(true);
          return sessionLength * 60;
        }
      }
      return prev - 1;
    });
  };
  const startStop = () => {
    if (isRunning) {
      clearInterval(intervalId);
      setIsRunning(false);
      setIntervalId(null);
    } else {
      const newIntervalId = setInterval(tick, 1000);
      setIntervalId(newIntervalId);
      setIsRunning(true);
    }
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  return (
    <div className="App digital flex flex-col min-h-[100vh] justify-center items-center">
      <h1 className="text-7xl font-bold">25 + 5 Clock</h1>
      <div className="length-controls  flex flex-col justify-center items-center">
        <div id="break-label">Break Length</div>
        <div className="flex justify-center items-center gap-2">
          <button id="break-decrement" onClick={decrementBreak}>
            -
          </button>
          <div id="break-length">{breakLength}</div>
          <button id="break-increment" onClick={incrementBreak}>
            +
          </button>
        </div>
        <div id="session-label">Session Length</div>
        <div className="flex justify-center items-center gap-2">
          <button id="session-decrement" onClick={decrementSession}>
            -
          </button>
          <div id="session-length">{breakLength}</div>
          <button id="session-increment" onClick={incrementSession}>
            +
          </button>
        </div>
      </div>
      <div className="timer flex flex-col justify-center items-center">
        <div id="timer-label">{isSession ? "Session" : "Break"}</div>
        <div id="time-left" className="text-9xl">
          {formatTime(timeLeft)}
        </div>
        <div className="flex gap-2">
          <button id="start_stop" onClick={startStop}>
            {isRunning ? "Pause" : "Start"}
          </button>
          <button id="reset" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
      <audio id="beep" src={beepAudio}></audio>
      <div id="credits">
        <ul className="flex gap-2 digital absolute bottom-10 left-10">
          <li>
            <a href="https://www.linkedin.com/in/aviral-ale/" target="blank">
              Li.
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/aviral.who_/" target="blank">
              Insta.
            </a>
          </li>
          <li>
            <a href="https://github.com/dedyspooky" target="blank">
              Github.
            </a>
          </li>
          <li>
            <a href="https://www.abiralale.com.np/" target="blank">
              Portfolio.
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
