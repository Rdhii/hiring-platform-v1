import {  Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/AdminPage'
import ManagePage from './pages/ManagePage'
import UserPage from './pages/UserPage'
import Login from './components/login/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/manage" element={<ManagePage />} />
        <Route path="/" element={<UserPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
