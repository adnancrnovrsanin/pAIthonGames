import './App.css'
import { Route, Routes } from 'react-router-dom'
import PyTanja from './pages/PyTanja.js'
import PyStolovina from './pages/PyStolovina.js'
import Home from './pages/Home.js'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pytanja" element={<PyTanja />} />
        <Route path="/pystolovina" element={<PyStolovina />} />
      </Routes>
    </div>
  )
}

export default App
