import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Painel from './pages/Painel/Painel'
import Emerg from './pages/Emerg/Emerg'
import Recep from './pages/Recep/Recep'
import Leitos from './pages/Leitos/Leitos'

export default function App() {

  const [user, setUser] = useState(false)



  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/painel" element={<Painel />} />
        <Route path="/emerg" element={<Emerg />} />
        <Route path="/recep" element={<Recep />} />
        <Route path="/leitos" element={<Leitos />} />
      </Routes>
    </Router>
  )
}