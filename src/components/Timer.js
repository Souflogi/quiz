import { useEffect } from "react";

function Timer({ secondsRemaining, ticking, dispatch }) {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = Math.floor(secondsRemaining % 60);
  useEffect(() => {
    if (!ticking) return;
    const intervalID = setInterval(() => {
      dispatch({ type: "Tick" });
    }, 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, [dispatch, ticking]);

  return (
    <p className="timer">
      {minutes.toString().padStart(2, 0)}:{seconds.toString().padStart(2, 0)}
    </p>
  );
}

export default Timer;
