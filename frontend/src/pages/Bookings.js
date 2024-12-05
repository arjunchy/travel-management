import React from 'react';
import AddBooking from '../components/AddBooking';
import BookingList from '../components/BookingList';

const Booking = () => {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Manage Bookings</h2>
      <AddBooking />
      <BookingList />
    </div>
  );
};

export default Booking;
