import './App.css';
import Dashboard from "./Dashboard"
import SubjectPage from "./SubjectPage"
import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';


function Login() {
  const navigate = useNavigate();

  function handleLogin(){
    navigate('/dashboard')
  }

  return (
    <button onClick={handleLogin}>Login</button>
  )
}

function App() {

  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subjects/:subject" element={<SubjectPage />} />
      </Routes>
      </div>
    </Router>

);
}

export default App;
