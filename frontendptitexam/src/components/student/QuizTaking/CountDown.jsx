import React, { useEffect, useState } from "react";

const Countdown = ({ time }) => {
  const [minutes, setMinutes] = useState(time);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <div id="time" className="card card-countdown">
      <div className="circle">
        <div className="dot"></div>
        <svg>
          <circle cx="70" cy="70" r="70"></circle>
          <circle cx="70" cy="70" r="70" id="rr"></circle>
        </svg>
        <div id="remain">
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </div>
      </div>
    </div>
  );
};

export default Countdown;
