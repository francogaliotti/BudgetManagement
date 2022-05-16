import './App.css';
import { useState, useEffect } from 'react'
import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import { AuthContext } from './helpers/AuthContext'
import Home from './pages/Home';
import AddRecord from './pages/AddRecord'
import Login from './pages/Login'
import Register from './pages/Register'
import FilterModal from './components/FilterModal'
import Expenses from './pages/Expenses'
import Incomes from './pages/Incomes'
import axios from 'axios'
import MenuIcon from '@material-ui/icons/Menu';

function App() {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false
  })
  const [openFilterModal, setOpenFilterModal] = useState(false)
  const [openResponsiveMenu, setOpenResponsiveMenu] = useState(false)
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

  const showResponsiveMenu = () => {
    if (openResponsiveMenu) {
      setOpenResponsiveMenu(false)
    } else {
      setOpenResponsiveMenu(true)
    }
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <div className='navbar'>
          <div className='links'>
            {authState.status ? (<>
              <Link to="/"> Home</Link>
              <Link to="/addRecord"> Add Record</Link>
              <label onClick={() => { setOpenFilterModal(true) }}> Filter Records</label>
              <div className='loggedInContainer'>

                <label onClick={logOut}> LogOut</label>
              </div>
            </>) : (<>
              <Link to="/login"> Login</Link>
              <Link to="/register"> Register</Link>
            </>)}
          </div>
        </div>

        <div className='nav'>
          <MenuIcon className='menuIcon' onClick={showResponsiveMenu} />
        </div>
        {openResponsiveMenu && <div className='navbar-responsive'>
          <div className='links'>
            {authState.status ? (<>
              <Link to="/" onClick={showResponsiveMenu}> Home</Link>
              <Link to="/addRecord" onClick={showResponsiveMenu}> Add Record</Link>
              <label onClick={() => {
                setOpenFilterModal(true)
                showResponsiveMenu()
              }}> Filter Records</label>
              <label onClick={() => {
                logOut()
                showResponsiveMenu()
              }}> LogOut</label>
            </>) : (<>
              <Link to="/login" onClick={showResponsiveMenu}> Login</Link>
              <Link to="/register" onClick={showResponsiveMenu}> Register</Link>
            </>)}
          </div>
        </div>}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addRecord" element={<AddRecord />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/incomes" element={<Incomes />} />
          <Route path="/expenses" element={<Expenses />} />
        </Routes>
        {openFilterModal && <FilterModal
          closeModal={setOpenFilterModal} />}
      </AuthContext.Provider>
    </div>
  );
}

export default App;
