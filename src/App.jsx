import {  Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/AdminPage'
import Modal from './components/Modal'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route path="/test" element={<Modal />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
