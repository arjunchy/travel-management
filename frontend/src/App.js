// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Vehicles from './pages/Vehicles';
import Bookings from './pages/Bookings';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </Router>
  );
};

export default App;