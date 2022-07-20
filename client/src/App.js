import './App.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Login from './pages/Login';


function App() {
  return (
    <div className="App">
    <h1>Outdoor Dictionary</h1>
    <Navbar />
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
    </Routes>
    </div>
  );
}

export default App;
