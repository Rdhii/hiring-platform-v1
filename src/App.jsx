import {  Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/AdminPage'
import ManagePage from './pages/ManagePage'
import UserPage from './pages/UserPage'
import Login from './components/login/Login'
import Resume from './components/user/Resume'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/jobs/:id/candidates" element={<ManagePage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/" element={<Login />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
