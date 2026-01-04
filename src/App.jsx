import {  Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/AdminPage'
import ManagePage from './pages/ManagePage'
import UserPage from './pages/UserPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/manage" element={<ManagePage />} />
        <Route path="/" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
