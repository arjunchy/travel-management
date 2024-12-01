// src/pages/Vehicles.js
import { useEffect, useState } from 'react';
import VehicleList from '../components/VehicleList';
import AddVehicle from '../components/AddVehicle'; // Import the new component

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = async () => {
    const response = await fetch('http://localhost:3000/vehicles');
    const data = await response.json();
    setVehicles(data);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Available Vehicles</h1>
      <AddVehicle onVehicleAdded={fetchVehicles} /> {/* Pass the fetchVehicles function */}
      <VehicleList vehicles={vehicles} />
    </div>
  );
};

export default Vehicles;