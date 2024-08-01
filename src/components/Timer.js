import { useEffect, useState } from "react";

function Timer({
  duration = 120,
  tickAction = () => {},
  endAction = () => {},
}) {
  const [time, setTime] = useState(duration);
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  useEffect(() => {
    const intervalID = setInterval(() => {
      if (time < 1) endAction();
      else {
        setTime(time => time - 1);
        tickAction(time);
      }
    }, 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, [endAction, tickAction, time]);

  return (
    <p className="timer">
      {minutes.toString().padStart(2, 0)}:{seconds.toString().padStart(2, 0)}
    </p>
  );
}

export default Timer;
