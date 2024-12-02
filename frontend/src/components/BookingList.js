// src/components/BookingList.js
import { useState } from 'react';
import UpdateBooking from './UpdateBooking';

const BookingList = ({ bookings, onBookingDeleted }) => {
  const [editingBooking, setEditingBooking] = useState(null);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/bookings/${id}`, {
      method: 'DELETE',
    });
    onBookingDeleted(); // Refresh the booking list after deletion
  };

  const handleUpdateClick = (booking) => {
    setEditingBooking(booking);
  };

  const handleBookingUpdated = () => {
    setEditingBooking(null);
    onBookingDeleted(); // Refresh the booking list after updating
  };

  const handleCancelUpdate = () => {
    setEditingBooking(null);
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
          {bookings.map((booking) => (
            <li key={booking.id} className="mb-2">
              <span>User ID: {booking.user_id}, Vehicle ID: {booking.vehicle_id}, Booking Date: {booking.booking_date}</span>
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
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingList;