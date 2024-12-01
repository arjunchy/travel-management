// src/pages/Bookings.js
import { useEffect, useState } from 'react';
import BookingList from '../components/BookingList';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await fetch('http://localhost:3000/bookings');
      const data = await response.json();
      setBookings(data);
    };
    fetchBookings();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>
      <BookingList bookings={bookings} />
    </div>
  );
};

export default Bookings;