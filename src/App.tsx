import { useState } from 'react'
import './App.css'
import Clock from './Components/Clock/Clock'
import AddForm from './Components/AddForm/AddForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AddForm>
      <Clock title='London' timeZone={0}/>
    </AddForm>
    
    </>
  )
}

export default App
