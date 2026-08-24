import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((previousCount) => previousCount + 1);
  };

  const decrement = () => {
    setCount((previousCount) => previousCount - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="counter-page">

      <div className="counter-container">

        <div className="counter-icon">
          🔢
        </div>

        <h1>Counter App</h1>

        <p className="subtitle">
          Increment, decrement and reset the counter
        </p>

        <div className="counter-card">

          <p className="count-label">
            Current Count
          </p>

          <div className="count-display">
            {count}
          </div>

          <div className="buttons">

            <button
              className="counter-button decrement"
              onClick={decrement}
            >
              −
            </button>

            <button
              className="counter-button reset"
              onClick={reset}
            >
              Reset
            </button>

            <button
              className="counter-button increment"
              onClick={increment}
            >
              +
            </button>

          </div>

        </div>

        <div className="actions">

          <div className="action-card">
            <span>➖</span>
            <div>
              <h3>Decrement</h3>
              <p>Decrease by 1</p>
            </div>
          </div>

          <div className="action-card">
            <span>🔄</span>
            <div>
              <h3>Reset</h3>
              <p>Set count to 0</p>
            </div>
          </div>

          <div className="action-card">
            <span>➕</span>
            <div>
              <h3>Increment</h3>
              <p>Increase by 1</p>
            </div>
          </div>

        </div>

        <p className="footer">
          Built with React and Vite
        </p>

      </div>

    </div>
  );
}

export default App;