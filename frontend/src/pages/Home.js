// src/pages/Home.js
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-6">Welcome to Vehicle and Booking Management</h1>
          <p className="text-lg md:text-xl text-gray-700 mb-10">
            Simplify your vehicle management and booking processes with ease.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link to="/vehicles" className="bg-blue-500 text-white px-8 py-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105">
            Manage Vehicles
          </Link>
          <Link to="/bookings" className="bg-green-500 text-white px-8 py-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300 transform hover:scale-105">
            Manage Bookings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
