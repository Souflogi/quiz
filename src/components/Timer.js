import { useEffect, useState } from "react";

function Timer({
  duration = 120,
  tickAction = () => {},
  endAction = () => {},
}) {
  const [time, setTime] = useState(duration);
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  console.log("ticking");
  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(time => {
        if (time <= 1) {
          endAction();
          clearInterval(intervalID);
          return 0;
        }
        tickAction(time - 1);
        return time - 1;
      });
    }, 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, [endAction, tickAction]);

  return (
    <p className="timer">
      {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </p>
  );
}

export default Timer;
