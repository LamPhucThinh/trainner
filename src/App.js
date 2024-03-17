import {useState} from 'react'
import './style.css'
function App() {
  const number = [100,200,300]
  const [counter, setCounter] = useState(() => {
    const total = number.reduce((total,current) => total +current)
    return total
  })// có logic gì mà kết quả của nó dùng để set gia trị innit cho useState thì ghi logic đó vào trong useState
  const [info, setinfo] = useState({
    name:'abc',
    age:'233',
  })
  const handleIncease = () => {
    setCounter(a => a + 1 )
    setCounter(a => a + 1 )
    setCounter(a => a + 1 )
  }

  const handleDecease = () => {
    setCounter(counter - 1)
  }

  const handleUpdate = () => {
    setinfo ({
      ...info,
      phone:'1234',
      address:'abs/xyz/hhh'
    })
  }

  return (
    <div className="App">
      <h1>{counter}</h1>
      <button onClick = {handleIncease}>increase</button>
      <button onClick = {handleDecease}>decrease</button>

      <h1>render object</h1>
      <h2>{JSON.stringify(info)}</h2>
      <button onClick = {handleUpdate}>update</button>
    </div>
  );
}

export default App;
