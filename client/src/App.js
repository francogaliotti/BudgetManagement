import './App.css';
import { useNavigate, Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home';
import AddRecord from './pages/AddRecord'

function App() {
  return (
    <div className="App">
      <div className='navbar'>
        <div className='links'>
          <Link to="/"> Home</Link>
          <Link to="/addRecord"> Add Record</Link>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addRecord" element={<AddRecord />} />
      </Routes>
    </div>
  );
}

export default App;
