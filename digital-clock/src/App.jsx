import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = currentTime
    .getHours()
    .toString()
    .padStart(2, "0");

  const minutes = currentTime
    .getMinutes()
    .toString()
    .padStart(2, "0");

  const seconds = currentTime
    .getSeconds()
    .toString()
    .padStart(2, "0");

  const formattedTime = currentTime.toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }
  );

  const formattedDate = currentTime.toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="clock-page">

      <div className="clock-container">

        <div className="clock-header">
          <div className="clock-icon">🕐</div>

          <h1>Digital Clock</h1>

          <p>
            Current local time
          </p>
        </div>

        <div className="clock-card">

          <div className="time-display">
            <span>{hours}</span>
            <span className="colon">:</span>
            <span>{minutes}</span>
            <span className="colon">:</span>
            <span>{seconds}</span>
          </div>

          <div className="ampm">
            {formattedTime.slice(-2)}
          </div>

          <div className="date-display">
            📅 {formattedDate}
          </div>

        </div>

        <div className="clock-info">

          <div className="info-card">
            <span>⏱️</span>

            <div>
              <h3>Hours</h3>
              <p>{hours}</p>
            </div>
          </div>

          <div className="info-card">
            <span>⏰</span>

            <div>
              <h3>Minutes</h3>
              <p>{minutes}</p>
            </div>
          </div>

          <div className="info-card">
            <span>⌛</span>

            <div>
              <h3>Seconds</h3>
              <p>{seconds}</p>
            </div>
          </div>

        </div>

        <p className="footer-text">
          Your clock updates automatically every second
        </p>

      </div>

    </div>
  );
}

export default App;