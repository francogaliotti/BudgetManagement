import './App.css';
import { useNavigate, Route, Routes, Link } from 'react-router-dom'
import Home from './components/Home';
import AddRecord from './components/AddRecord'

function App() {
  return (
    <div className="App">
      <div className='navbar'>
        <Link to="/"> Home</Link>
        <Link to="/addRecord"> Add Record</Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addRecord" element={<AddRecord />} />
      </Routes>
    </div>
  );
}

export default App;
