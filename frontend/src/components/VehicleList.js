// src/components/VehicleList.js
const VehicleList = ({ vehicles }) => {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Available Vehicles</h2>
      <div className="max-w-4xl mx-auto">
        {vehicles.map(vehicle => (
          <div key={vehicle.id} className="bg-white border border-gray-200 rounded-lg shadow-lg mb-4 overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2 text-blue-600">{vehicle.type}</h3>
              <p className="text-gray-700 mb-2"><strong>Source:</strong> {vehicle.source}</p>
              <p className="text-gray-700 mb-2"><strong>Destination:</strong> {vehicle.destination}</p>
              <p className="text-gray-700 mb-2"><strong>Departure Time:</strong> {new Date(vehicle.departure_time).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleList;
