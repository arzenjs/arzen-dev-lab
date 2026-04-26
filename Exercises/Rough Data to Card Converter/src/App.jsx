import { useState } from 'react'
import Header from './header'
import './App.css'

function App() {
  const [show, setShow] = useState(false)
  const [data, setData] = useState()
  async function gettingData() {
    let response = await fetch('http://localhost:3000/data', { method: 'POST' })
    let data = await response.json()
    setData(data)
  }

  function btnClick() {
    gettingData();
    setShow(!show);
  }
  return (
    <div className="App">
      <Header />
      <div className="buttonWrapper">
        {show ? <button onClick={btnClick}>Hide Data</button> : <button onClick={btnClick}>Get Data</button>}
      </div>
      {
        data && data.map((item) => {
          return (
            <div className="dataHolder">
              {show ? <div key={item.id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
                <h2>{item.name}</h2>
                <h4>{item.Proffesion}</h4>
              </div> : ""}
            </div>
          )
        })
      }
    </div>
  )
}

export default App