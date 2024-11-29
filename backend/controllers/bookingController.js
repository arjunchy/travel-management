// controllers/bookingController.js
const { Booking } = require('../models/booking');
const Vehicle = require('../models/Vehicle'); // Adjust this based on your file's actual location


// Add a booking
const { Op } = require('sequelize'); // Import Op
exports.addBooking = async (req, res) => {
  try {
      const bookingDate = new Date(req.body.booking_date); // Assuming booking_date is in a valid date format
      const startOfDay = new Date(bookingDate.setHours(0, 0, 0, 0)); // Start of the day
      const endOfDay = new Date(bookingDate.setHours(23, 59, 59, 999)); // End of the day

      const vehicle = await Vehicle.findOne({
          where: {
              source: req.body.source,
              destination: req.body.destination,
              departure_time: {
                  [Op.gte]: startOfDay, // Greater than or equal to the start of the day
                  [Op.lte]: endOfDay    // Less than or equal to the end of the day
              }
          }
      });

      if (!vehicle) {
          return res.status(400).json({ message: 'No available vehicle for the given route on the specified date.' });
      }

      const booking = await Booking.create({
          user_id: req.body.user_id,
          vehicle_id: vehicle.id,
          booking_date: req.body.booking_date,
      });

      res.status(201).json(booking);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating booking' });
  }
};
// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving bookings' });
  }
};

// Update booking
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ where: { id: req.params.id } });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.user_id = req.body.user_id || booking.user_id;
    booking.vehicle_id = req.body.vehicle_id || booking.vehicle_id;
    booking.booking_date = req.body.booking_date || booking.booking_date;

    await booking.save();
    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating booking' });
  }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ where: { id: req.params.id } });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await booking.destroy();
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting booking' });
  }
};
