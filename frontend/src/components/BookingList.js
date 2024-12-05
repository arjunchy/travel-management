// src/components/BookingList.js
import React, { useState, useEffect } from 'react';
import UpdateBooking from './UpdateBooking';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:3000/bookings');
      const data = await response.json();

      // eslint-disable-next-line no-console
      console.log('Fetched bookings:', data); // Log the fetched data

      // Check if data is an array
      if (Array.isArray(data)) {
        setBookings(data);
      } else {
        // eslint-disable-next-line no-console
        console.error('Invalid data format:', data);
        setBookings([]); // Reset to empty array if data is not an array
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching bookings:', error);
      setBookings([]); // Reset to empty array on error
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateClick = (booking) => {
    setEditingBooking(booking);
  };

  const handleCancelUpdate = () => {
    setEditingBooking(null);
  };

  const handleBookingUpdated = () => {
    fetchBookings(); // Refresh the bookings list after updating
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this booking?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3000/bookings/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchBookings(); // Refresh the bookings list after deletion
        } else {
          alert('Failed to delete booking.');
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error deleting booking:', error);
      }
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Current Bookings</h2>
      {editingBooking ? (
        <UpdateBooking
          booking={editingBooking}
          onBookingUpdated={handleBookingUpdated}
          onCancel={handleCancelUpdate}
        />
      ) : (
        <ul className="list-disc pl-5">
          {Array.isArray(bookings) && bookings.length > 0 ? (
            bookings.map((booking) => (
              <li key={booking.id} className="mb-2">
                <span>
                  User ID: {booking.user_id}, Vehicle ID: {booking.vehicle_id}, 
                  Booking Date: {booking.booking_date}
                </span>
                <button
                  onClick={() => handleUpdateClick(booking)}
                  className="ml-4 text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(booking.id)}
                  className="ml-2 text-red-600 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <li>No bookings available.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default BookingList;