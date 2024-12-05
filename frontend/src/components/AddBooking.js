// BookingForm.js
import React, { useState } from 'react';
import axios from 'axios';

function AddBooking() {
  const [userId] = useState('123'); // Replace with logic to get the authenticated user ID
  const [bookingDate, setBookingDate] = useState('');
  const [bookingType, setBookingType] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !bookingType || !bookingDate || !source || !destination) {
      setError('Please fill in all required fields.');
      return;
    }

    const bookingData = {
      user_id: userId,
      booking_type: bookingType,
      booking_date: bookingDate,
      source: source,
      destination: destination,
    };

    try {
      const response = await axios.post('http://localhost:3000/bookings', bookingData, {
        headers: { 'Content-Type': 'application/json' }
      });

      console.log('Booking added successfully:', response.data);
      alert('Booking added successfully!');
      // Reset the form fields
      setBookingDate('');
      setBookingType('');
      setSource('');
      setDestination('');
    } catch (error) {
      console.error('Error adding booking:', error);
      setError(error.response?.data?.message || 'An error occurred while adding the booking.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Book a Vehicle</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Booking Date:</label>
          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            required
            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Booking Type (e.g., car, train, aeroplane):</label>
          <input
            type="text"
            value={bookingType}
            onChange={(e) => setBookingType(e.target.value)}
            required
            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Source:</label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Destination:</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
        >
          Add Booking
        </button>
      </form>
    </div>
  );
}

export default AddBooking;
