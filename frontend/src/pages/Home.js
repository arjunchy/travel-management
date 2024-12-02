// src/pages/Home.js
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">Welcome to Vehicle and Booking Management</h1>
        <div className="text-center">
          <Link to="/vehicles" className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition duration-200 mr-4">Manage Vehicles</Link>
          <Link to="/bookings" className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition duration-200">Manage Bookings</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;