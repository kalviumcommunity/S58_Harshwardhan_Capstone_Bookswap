import { useState } from 'react'
import './App.css'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import SignUp from './pages/SignUp'
import AddBookPage from './pages/AddBookPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <MainPage/>
  )
}

export default App
