// src/components/BookingList.js
const BookingList = ({ bookings }) => {
    return (
      <div className="space-y-4">
        {bookings.map(booking => (
          <div key={booking.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Booking ID: {booking.id}</h2>
            <p>Vehicle: {booking.vehicleName}</p>
            <p>Date: {booking.date}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default BookingList;