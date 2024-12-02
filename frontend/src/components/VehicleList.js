// src/components/VehicleList.js
const VehicleList = ({ vehicles }) => {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Available Vehicles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map(vehicle => (
          <div key={vehicle.id} className="p-4 bg-white rounded shadow-md">
            <h3 className="text-xl font-semibold">{vehicle.type}</h3>
            <p className="text-gray-600">Source: {vehicle.source}</p>
            <p className="text-gray-600">Destination: {vehicle.destination}</p>
            <p className="text-gray-600">Departure Time: {new Date(vehicle.departure_time).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleList;