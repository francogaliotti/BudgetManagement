import './App.css';
import { useState } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import { AuthContext } from './helpers/AuthContext'
import Home from './pages/Home';
import AddRecord from './pages/AddRecord'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false
  })
  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <div className='navbar'>
          <div className='links'>
            <Link to="/"> Home</Link>
            <Link to="/addRecord"> Add Record</Link>
            <Link to="/login"> Login</Link>
            <Link to="/register"> Register</Link>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addRecord" element={<AddRecord />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
