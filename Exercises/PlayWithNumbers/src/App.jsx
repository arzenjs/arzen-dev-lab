import "./App.css";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  function updateCount(value) {
      let result = count + value
      if (result >= 0 && result <= 1000) {
        setCount(result)
      } else if (result <0 ){
        setCount(0)
      } else if (result > 1000){
        setCount(1000)
      }
  }

  return (
    <div className="container">
      <h1 className="count">{count}</h1>

      <div className="btn-group">
        <button className="btn" onClick={() => updateCount(+1)}>+1</button>
        <button className="btn" onClick={() => updateCount(-1)}>-1</button>
        <button className="btn" onClick={() => setCount(0)}>Reset</button>
      </div>

      <div className="btn-group">
        <button className="btn secondary" onClick={() => updateCount(+5)}>+5</button>
        <button className="btn secondary" onClick={() => updateCount(+10)}>+10</button>
        <button className="btn secondary" onClick={() => updateCount(+100)}>+100</button>
      </div>

      <div className="btn-group">
        <button className="btn secondary" onClick={() => updateCount(-5)}>-5</button>
        <button className="btn secondary" onClick={() => updateCount(-10)}>-10</button>
        <button className="btn secondary" onClick={() => updateCount(-100)}>-100</button>
      </div>

      <div className="btn-group">
        <button className="btn danger" onClick={() => setCount(10)}>Set to 10</button>
        <button className="btn danger" onClick={() => setCount(100)}>Set to 100</button>
      </div>
    </div>
  );
}

export default App;