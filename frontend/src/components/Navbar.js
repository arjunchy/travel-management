// src/components/Navbar.js
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li><Link className="text-white" to="/">Home</Link></li>
        <li><Link className="text-white" to="/vehicles">Vehicles</Link></li>
        <li><Link className="text-white" to="/bookings">Bookings</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;