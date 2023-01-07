import './App.css'
import { Route, Routes } from 'react-router-dom'
import PyTanja from './pages/PyTanja'
import PyStolovina from './pages/PyStolovina'
import Home from './pages/Home'

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
