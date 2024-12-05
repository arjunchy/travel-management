// src/components/AddVehicle.js
import { useState } from 'react';

const AddVehicle = ({ onVehicleAdded }) => {
  const [type, setType] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [departureTime, setDepartureTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const vehicleData = { type, source, destination, departure_time: departureTime };

    const response = await fetch('http://localhost:3000/vehicles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vehicleData),
    });

    if (response.ok) {
      alert('Vehicle added successfully!');
      onVehicleAdded(); // Refresh vehicle list
      setType('');
      setSource('');
      setDestination('');
      setDepartureTime('');
    } else {
      alert('Failed to add vehicle.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-6 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add New Vehicle</h2>
      <input
        type="text"
        placeholder="Type (e.g., Car, Train, Aeroplane)"
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
        className="block w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        required
        className="block w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        required
        className="block w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="datetime-local"
        value={departureTime}
        onChange={(e) => setDepartureTime(e.target.value)}
        required
        className="block w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
      >
        Add Vehicle
      </button>
    </form>
  );
};

export default AddVehicle;
