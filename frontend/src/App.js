// src/App.js
import { useState, useEffect } from 'react';
import AddVehicle from './components/AddVehicle';
import VehicleList from './components/VehicleList';
import AddBooking from './components/AddBooking';
import BookingList from './components/BookingList';

const App = () => {
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);

  const fetchVehicles = async () => {
    const response = await fetch('http://localhost:3000/vehicles');
    const data = await response.json();
    setVehicles(data);
  };

  const fetchBookings = async () => {
    const response = await fetch('http://localhost:3000/bookings');
    const data = await response.json();
    setBookings(data);
  };

  useEffect(() => {
    fetchVehicles();
    fetchBookings();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Vehicle and Booking Management</h1>
      <AddVehicle onVehicleAdded={fetchVehicles} />
      <VehicleList vehicles={vehicles} />
      <AddBooking onBookingAdded={fetchBookings} />
      <BookingList bookings={bookings} />
    </div>
  );
};

export default App;