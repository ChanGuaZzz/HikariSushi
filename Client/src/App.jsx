import { useState } from 'react'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/login'
import Hikari from './pages/hikari'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router basename='/'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/hikari' element={<Hikari />} />

      </Routes>
    </Router>
  )
}

export default App
