import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import './App.css'
import { Home } from './pages/index'
import DynamicBackground from './components/DynamicBackground/DynamicBackground'

function App() {
  return (
    <>
      <BrowserRouter>
        <DynamicBackground />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
