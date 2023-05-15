import React, { useState, useRef } from "react";
import "./App.css";

function padTime(time) {
  return time.toString().padStart(2, "0");
}

const App = () => {
  const [title, setTitle] = useState("let the timer begin!!!");
  const [timeleft, setTimerLeft] = useState(25 * 60);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (intervalRef.current !== null) return;

    setTitle(`You're doing great!`);
    intervalRef.current = setInterval(() => {
      setTimerLeft((prevTime) => {
        if (prevTime >= 1) return prevTime - 1;

        resetTimer();
        return 0;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current === null) return;

    clearInterval(intervalRef.current);
    intervalRef.current = null;

    setTitle("keep it up!");
  };

  const resetTimer = () => {
    clearTimeout(intervalRef.current);
    intervalRef.current = null;
    setTitle("Ready to go another round?");
    setTimerLeft(25 * 60);
  };

  const minutes = padTime(Math.floor(timeleft / 60));
  const seconds = padTime(timeleft - minutes * 60);

  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default App;
