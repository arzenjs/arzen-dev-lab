import "./App.css";
import { useDeferredValue, useState } from "react";

function App() {

  const [input, setInput] = useState("0")

  function setDecimal() {
    let lastNumber = input.split(/[\+\-\*\/\%]/).slice(-1)[0]
    if (!lastNumber.includes(".")) {
      setInputDigit(".")
    }
  }

  function setInputDigit(digit) {
    if (input === "0" && digit == ".") {
      setInput("0.")
    } else if (input === "0") {
      setInput(digit)
    } else if (input.endsWith("÷") | input.endsWith("×") | input.endsWith("-") | input.endsWith("+") | input.endsWith("%") && digit == ".") {
      setInput(input + "0.")
    } else {
      setInput(input + digit)
    }
  }

  function setOperation(op) {
    if (!input.endsWith(op) && !input.endsWith("÷") && !input.endsWith("×") && !input.endsWith("-") && !input.endsWith("+") && !input.endsWith("%")) {
      setInput(input + op)
    }
    if (input.endsWith(".")) {
      setInput(input + "0" + op)
    }
  }

  function backspace() {
    if (input.length === 1) {
      setInput("0")
    } else if (input !== "0") {
      setInput(input.slice(0, -1))
    }
  }

  const ops = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "×": (a, b) => a * b,
    "÷": (a, b) => a / b,
    "%": (a, b) => a % b,
    // ops["+"](2, 3) = add(2, 3)
  };

  function Calculate() {
    if (!input.endsWith("÷") && !input.endsWith("×") && !input.endsWith("-") && !input.endsWith("+") && !input.endsWith("%")) {
     let exp = input.match(/\d+(\.\d+)?|[+\-×÷%]/g);

      const NumExp = exp.map(el => {
        const num = Number(el);
        return Number.isNaN(num) ? el : num;
      });

      for (let i = 0; i < NumExp.length; i++) {
        const operator = NumExp[i];
        function solver() {
          let opIndex = i;
          let leftOperand = NumExp[opIndex - 1];
          let rightOperand = NumExp[opIndex + 1];
          let result = ops[operator](leftOperand, rightOperand);
          NumExp.splice(opIndex - 1, 3, result);
          i = 0
        }
        if (operator == "×") {
          solver()
        } else if (operator == "÷") {
          solver()
        } else if (operator == "%") {
          solver()
        } else if (operator == "+") {
          solver()
        } else if (operator == "-") {
          solver()
        }
      }

      setInput(String(NumExp[0]))
    }
  }

  function clear() {
    setInput("0")
  }

  return (
  <div className="calculator">
    <div className="display">
      <div className="display-text">{input}</div>
    </div>

    <div className="buttons">
      <button className="btn special" onClick={clear}>C</button>
      <button className="btn special backspace" onClick={backspace}>⌫</button>
      <button className="btn special" onClick={() => setOperation("%")}>%</button>
      <button className="btn operator" onClick={() => setOperation("÷")}>÷</button>

      <button className="btn" onClick={() => setInputDigit("7")}>7</button>
      <button className="btn" onClick={() => setInputDigit("8")}>8</button>
      <button className="btn" onClick={() => setInputDigit("9")}>9</button>
      <button className="btn operator" onClick={() => setOperation("×")}>×</button>

      <button className="btn" onClick={() => setInputDigit("4")}>4</button>
      <button className="btn" onClick={() => setInputDigit("5")}>5</button>
      <button className="btn" onClick={() => setInputDigit("6")}>6</button>
      <button className="btn operator" onClick={() => setOperation("-")}>-</button>

      <button className="btn" onClick={() => setInputDigit("1")}>1</button>
      <button className="btn" onClick={() => setInputDigit("2")}>2</button>
      <button className="btn" onClick={() => setInputDigit("3")}>3</button>
      <button className="btn operator" onClick={() => setOperation("+")}>+</button>

      <button className="btn zero" onClick={() => setInputDigit("0")}>0</button>
      <button className="btn dot" onClick={setDecimal}>.</button>
      <button className="btn equals" onClick={Calculate}>=</button>
    </div>
  </div>
);
}

export default App;