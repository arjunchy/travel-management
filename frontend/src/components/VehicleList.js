// src/components/VehicleList.js
const VehicleList = ({ vehicles }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map(vehicle => (
          <div key={vehicle.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{vehicle.name}</h2>
            <p>{vehicle.description}</p>
            <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded">Book Now</button>
          </div>
        ))}
      </div>
    );
  };
  
  export default VehicleList;