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

      console.log('Fetched bookings:', data);

      if (Array.isArray(data)) {
        setBookings(data);
      } else {
        console.error('Invalid data format:', data);
        setBookings([]);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setBookings([]);
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
    fetchBookings();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this booking?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3000/bookings/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchBookings();
        } else {
          alert('Failed to delete booking.');
        }
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    }
  };

  return (
    <div className="mt-6 p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Current Bookings</h2>
      {editingBooking ? (
        <UpdateBooking
          booking={editingBooking}
          onBookingUpdated={handleBookingUpdated}
          onCancel={handleCancelUpdate}
        />
      ) : (
        <ul className="space-y-4">
          {Array.isArray(bookings) && bookings.length > 0 ? (
            bookings.map((booking) => (
              <li key={booking.id} className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow flex justify-between items-center">
                <div className="text-gray-700">
                  <p><strong>User ID:</strong> {booking.user_id}</p>
                  <p><strong>Vehicle ID:</strong> {booking.vehicle_id}</p>
                  <p><strong>Booking Date:</strong> {booking.booking_date}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleUpdateClick(booking)}
                    className="px-3 py-1 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(booking.id)}
                    className="px-3 py-1 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No bookings available.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default BookingList;
