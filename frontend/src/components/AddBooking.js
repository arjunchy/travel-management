import { useState, useEffect } from 'react';

const AddBooking = ({ onBookingAdded, loggedInUserId }) => {
  const [vehicleId, setVehicleId] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingType, setBookingType] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('http://localhost:3000/vehicles');
        if (!response.ok) {
          throw new Error('Failed to fetch vehicles');
        }
        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        setError('Could not load vehicles. Please try again later.');
      }
    };

    fetchVehicles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    if (!vehicleId || !bookingDate || !source || !destination) {
      setError('Please fill in all fields.');
      return;
    }

    const bookingData = { 
      user_id: loggedInUserId,
      vehicle_id: vehicleId, 
      booking_date: bookingDate,
      booking_type: bookingType,
      source: source,
      destination: destination
    };

    try {
      const response = await fetch('http://localhost:3000/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        alert('Booking added successfully!');
        onBookingAdded();
        // Reset the form fields
        setVehicleId('');
        setBookingDate('');
        setBookingType('');
        setSource('');
        setDestination('');
      } else {
        const errorResponse = await response.json();
        setError(`Failed to add booking: ${errorResponse.message}`);
      }
    } catch (error) {
      console.error('Error adding booking:', error);
      setError('An error occurred while adding the booking.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Booking</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <select
        value={vehicleId}
        onChange={(e) => {
          const selectedVehicle = vehicles.find(vehicle => vehicle.id === e.target.value);
          setVehicleId(selectedVehicle.id);
          setBookingType(selectedVehicle.type); // Set booking type based on selected vehicle
        }}
        required
        className="block w-full p-2 mb-4 border rounded"
      >
        <option value="">Select Vehicle</option>
        {vehicles.map(vehicle => (
          <option key={vehicle.id} value={vehicle.id}>
            {vehicle.type} 
          </option>
        ))}
      </select>
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
        type="date"
        value={bookingDate}
        onChange={(e) => setBookingDate(e.target.value)}
        required
        className="block w-full p-2 mb-4 border rounded"
      />
      <input
        type="text"
        placeholder="Booking Type"
        value={bookingType}
        onChange={(e) => setBookingType(e.target.value)}
        required
        className="block w-full p-2 mb-4 border rounded"
      />
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition duration-200"
      >
        Add Booking
      </button>
    </form>
  );
};

export default AddBooking;