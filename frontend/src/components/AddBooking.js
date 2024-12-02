// src/components/AddBooking.js
import { useState } from 'react';

const AddBooking = ({ onBookingAdded }) => {
  const [userId, setUserId] = useState(''); // Corrected the state variable name
  const [vehicleId, setVehicleId] = useState('');
  const [bookingDate, setBookingDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Prepare the booking data
    const bookingData = { user_id: userId, vehicle_id: vehicleId, booking_date: bookingDate };

    try {
      const response = await fetch('http://localhost:3000/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        alert('Booking added successfully!');
        onBookingAdded(); // Refresh the booking list
        setUserId(''); // Reset the state
        setVehicleId('');
        setBookingDate('');
      } else {
        const errorResponse = await response.json();
        alert(`Failed to add booking: ${errorResponse.message}`);
      }
    } catch (error) {
      console.error('Error adding booking:', error);
      alert('An error occurred while adding the booking.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Booking</h2>
      <input
        type="text"
        placeholder="User  ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)} // Corrected the setter function
        required
        className="block w-full p-2 mb-4 border rounded"
      />
      <input
        type="text"
        placeholder="Vehicle ID"
        value={vehicleId}
        onChange={(e) => setVehicleId(e.target.value)}
        required
        className="block w-full p-2 mb-4 border rounded"
      />
      <input
        type="datetime-local"
        value={bookingDate}
        onChange={(e) => setBookingDate(e.target.value)}
        required
        className="block w-full p-2 mb-4 border rounded"
      />
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition duration-200"
      >
        Add Booking
      </button>
    </form>
  );
};

export default AddBooking;