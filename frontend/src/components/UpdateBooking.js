// src/components/UpdateBooking.js
import { useState, useEffect } from 'react';

const UpdateBooking = ({ booking, onBookingUpdated, onCancel }) => {
  const [userId, setUserId] = useState(booking.user_id);
  const [vehicleId, setVehicleId] = useState(booking.vehicle_id);
  const [bookingDate, setBookingDate] = useState(booking.booking_date);

  useEffect(() => {
    setUserId(booking.user_id);
    setVehicleId(booking.vehicle_id);
    setBookingDate(booking.booking_date);
  }, [booking]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedBookingData = { user_id: userId, vehicle_id: vehicleId, booking_date: bookingDate };

    try {
      const response = await fetch(`http://localhost:3000/bookings/${booking.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBookingData),
      });

      if (response.ok) {
        alert('Booking updated successfully!');
        onBookingUpdated(); // Refresh the booking list
        onCancel(); // Close the update form
      } else {
        alert('Failed to update booking. Please try again.');
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('An error occurred while updating the booking.');
    }
  };

  return (
    <form onSubmit={handleUpdate} className="mb-4">
      <h3 className="text-xl font-bold mb-2">Update Booking</h3>
      <div className="mb-2">
        <label className="block mb-1">User  ID:</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Vehicle ID:</label>
        <input
          type="text"
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Booking Date:</label>
        <input
          type="date"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white p-2 mr-2">Update</button>
      <button type="button" onClick={onCancel} className="bg-gray-400 text-white p-2">Cancel</button>
    </form>
  );
};

export default UpdateBooking;