import { useEffect } from "react";

function Timer({ timeRemaining, timerOn, dispatch }) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = Math.floor(timeRemaining % 60);
  useEffect(() => {
    if (!timerOn) return;
    const intervalID = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, [dispatch, timerOn]);

  return (
    <p className="timer">
      {minutes.toString().padStart(2, 0)}:{seconds.toString().padStart(2, 0)}
    </p>
  );
}

export default Timer;

/* This timer need to be Encapsulated or isolated communicate through typical API and trigger action and to be configurable  */
