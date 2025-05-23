import { useState } from 'react'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import Login from './pages/login.jsx'
import Hikari from './pages/hikari.jsx'
import Menu from './pages/Menu.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router basename='/'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/hikari' element={<Hikari />} />
        <Route path='/menu' element={<Menu />} />
      </Routes>
    </Router>
  )
}

export default App
