import React from 'react';
import VehicleList from '../components/VehicleList.js';
import AddVehicle from '../components/AddVehicle.js';

const Vehicles = () => {
  return (
    <div>
      <h1>Vehicle Management</h1>
      <AddVehicle />
      <VehicleList />
    </div>
  );
};

export default Vehicles;
