import {  Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
