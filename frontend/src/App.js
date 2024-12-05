// src/App.js
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddVehicle from './components/AddVehicle';
import VehicleList from './components/VehicleList';
import AddBooking from './components/AddBooking';
import BookingList from './components/BookingList';

const App = () => {
  const [vehicles, setVehicles] = useState([]); // Initial state as an empty array
  const [bookings, setBookings] = useState([]);

  const fetchVehicles = async () => {
    try {
      const response = await fetch('http://localhost:3000/vehicles');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:3000/bookings');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    fetchVehicles();
    fetchBookings();
  }, []);

  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          {/* This route will be the default route that displays the Home page */}
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={
            <>
              <h1 className="text-3xl font-bold text-center mb-6">Manage Vehicles</h1>
              <AddVehicle onVehicleAdded={fetchVehicles} />
              <VehicleList vehicles={vehicles} />
            </>
          } />
          <Route path="/bookings" element={
            <>
              <h1 className="text-3xl font-bold text-center mb-6">Manage Bookings</h1>
              <AddBooking onBookingAdded={fetchBookings} />
              <BookingList bookings={bookings} />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
