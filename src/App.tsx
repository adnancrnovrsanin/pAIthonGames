import './App.css'
import { Route, Routes } from 'react-router-dom'
import PyTanja from './pages/PyTanja'
import PyStolovina from './pages/PyStolovina'
import Home from './pages/Home'
import { observer } from 'mobx-react-lite'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer position='bottom-right' hideProgressBar theme="colored"/>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="pytanja" element={<PyTanja />} />
        <Route path="pystolovina" element={<PyStolovina />} />
      </Routes>
    </div>
  )
}

export default observer(App);
