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
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Vehicle</h2>
      <input
        type="text"
        placeholder="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
        className="block w-full p-2 mb-4 border rounded"
      />
      <input
        type="text"
        placeholder="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        required
        className="block w-full p-2 mb-4 border rounded"
      />
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        required
        className="block w-full p-2 mb-4 border rounded"
      />
      <input
        type="datetime-local"
        value={departureTime}
        onChange={(e) => setDepartureTime(e.target.value)}
        required
        className="block w-full p-2 mb-4 border rounded"
      />
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition duration-200"
      >
        Add Vehicle
      </button>
    </form>
  );
};

export default AddVehicle;