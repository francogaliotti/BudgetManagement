import './App.css';
import { useState, useEffect } from 'react'
import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import { AuthContext } from './helpers/AuthContext'
import Home from './pages/Home';
import AddRecord from './pages/AddRecord'
import Login from './pages/Login'
import Register from './pages/Register'
import axios from 'axios'

function App() {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false
  })
  useEffect(() => {
    axios.get('http://localhost:8080/auth/', {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    }).then((res) => {
      setAuthState({
        username: res.data.username,
        id: res.data.id,
        status: true
      })
    }).catch((err) => {
      setAuthState({
        ...authState,
        status: false
      })
    })
  }, []);
  const logOut = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("username")
    setAuthState({
      username: "",
      id: 0,
      status: false
    })
    navigate("/login")
  }
  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <div className='navbar'>
          <div className='links'>
            {authState.status ? (<>
              
              <Link to="/"> Home</Link>
              <Link to="/addRecord"> Add Record</Link>
              <div className='loggedInContainer'>
                
                <label onClick={logOut}> LogOut</label>
              </div>
            </>) : (<>
              <Link to="/login"> Login</Link>
              <Link to="/register"> Register</Link>
            </>)}
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
