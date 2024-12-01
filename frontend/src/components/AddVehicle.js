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
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicleData),
    });

    if (response.ok) {
      alert('Vehicle added successfully!');
      // Call the callback to refresh the vehicle list
      onVehicleAdded();
      // Reset the form fields
      setType('');
      setSource('');
      setDestination('');
      setDepartureTime('');
    } else {
      alert('Failed to add vehicle.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Vehicle</h2>
      <div>
        <label>Type:</label>
        <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
      </div>
      <div>
        <label>Source:</label>
        <input type="text" value={source} onChange={(e) => setSource(e.target.value)} required />
      </div>
      <div>
        <label>Destination:</label>
        <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} required />
      </div>
      <div>
        <label>Departure Time:</label>
        <input type="datetime-local" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} required />
      </div>
      <button type="submit" className="mt-2 bg-blue-500 text-white py-2 px-4 rounded">Add Vehicle</button>
    </form>
  );
};

export default AddVehicle;