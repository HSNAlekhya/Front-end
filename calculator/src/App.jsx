import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");

  const handleClick = (value) => {
    if (value === "C") {
      setDisplay("0");
      return;
    }

    if (value === "⌫") {
      setDisplay((prev) => {
        if (prev.length <= 1) {
          return "0";
        }
        return prev.slice(0, -1);
      });
      return;
    }

    if (value === "=") {
      try {
        const result = Function(`"use strict"; return (${display})`)();

        if (!Number.isFinite(result)) {
          setDisplay("Error");
        } else {
          setDisplay(String(result));
        }
      } catch {
        setDisplay("Error");
      }
      return;
    }

    if (display === "Error") {
      setDisplay(value);
      return;
    }

    if (display === "0" && !["+", "-", "*", "/"].includes(value)) {
      setDisplay(value);
    } else {
      setDisplay((prev) => prev + value);
    }
  };

  const buttons = [
    "C",
    "⌫",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];

  return (
    <div className="calculator-page">
      <div className="calculator">
        <h1>Calculator</h1>

        <div className="display">{display}</div>

        <div className="buttons">
          {buttons.map((button) => (
            <button
              key={button}
              onClick={() => handleClick(button)}
              className={
                button === "="
                  ? "equal"
                  : ["+", "-", "*", "/"].includes(button)
                  ? "operator"
                  : button === "C"
                  ? "clear"
                  : ""
              }
            >
              {button}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;