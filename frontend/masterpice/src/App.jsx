import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { LangProvider } from './context/LangContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import NeuralBackground from './components/NeuralBackground'
import Home from './pages/Home'
import Services from './pages/Services'
import Portfolio from './pages/portfolio'
import Order from './pages/Order'
import Contact from './pages/Contact'

function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <Toaster position="top-center" toastOptions={{
          style: {
            background: 'rgba(10,5,25,0.95)',
            color: '#F0EEFF',
            border: '1px solid rgba(123,47,255,0.3)',
            backdropFilter: 'blur(12px)',
          }
        }} />
        <div className="noise" />
        <div className="vignette" />
        <NeuralBackground />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/order" element={<Order />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </LangProvider>
  )
}

export default App