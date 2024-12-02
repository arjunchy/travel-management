// src/pages/Vehicles.js
import { useEffect, useState } from 'react';
import AddVehicle from '../components/AddVehicle';
import VehicleList from '../components/VehicleList';

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

  const handleVehicleAdded = () => {
    fetchVehicles();
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Manage Vehicles</h1>
      <AddVehicle onVehicleAdded={handleVehicleAdded} />
      <VehicleList vehicles={vehicles} />
    </div>
  );
};

export default Vehicles;