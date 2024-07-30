import { useEffect } from "react";

function Timer({ timeRemaining, timerRunning, dispatch }) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = Math.floor(timeRemaining % 60);
  useEffect(() => {
    if (!timerRunning) return;
    const intervalID = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, [dispatch, timerRunning]);

  return (
    <p className="timer">
      {minutes.toString().padStart(2, 0)}:{seconds.toString().padStart(2, 0)}
    </p>
  );
}

export default Timer;
