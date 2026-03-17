import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import './App.css'
import { Home , Contact, Details, AllProduct} from './pages/index'
import DynamicBackground from './components/DynamicBackground/DynamicBackground'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <DynamicBackground />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product/:id' element={<Details />} />
          <Route path='/products' element={<AllProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
