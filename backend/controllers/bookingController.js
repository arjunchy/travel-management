// controllers/bookingController.js
const Booking = require('../models/booking'); // Ensure this is importing the correct model
const Vehicle = require('../models/Vehicle'); // Adjust this based on your file's actual location
const { Op } = require('sequelize'); 

// Add new booking
exports.addBooking = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Debug: log the request body

    const bookingDate = new Date(req.body.booking_date);
    if (isNaN(bookingDate.getTime())) {
      throw new Error('Invalid booking date');
    }

    const startOfDay = new Date(bookingDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(bookingDate.setHours(23, 59, 59, 999));

    console.log('Start of Day:', startOfDay);
    console.log('End of Day:', endOfDay);

    // Mapping from bookingType to vehicle type
    const vehicleTypeMapping = {
      'car': 'Car',          // Vehicle type name in your database
      'train': 'Train',      // Vehicle type name in your database
      'aeroplane': 'Aeroplane' // Vehicle type name in your database
    };

    const vehicleType = vehicleTypeMapping[req.body.booking_type.toLowerCase()];

    if (!vehicleType) {
      console.log('Invalid booking type provided');
      return res.status(400).json({ message: 'Invalid booking type provided.' });
    }

    // Find a vehicle based on source, destination, date, and vehicle type
    const vehicle = await Vehicle.findOne({
      where: {
        type: vehicleType, // Match based on the vehicle type
        source: req.body.source,
        destination: req.body.destination,
        departure_time: {
          [Op.gte]: startOfDay,
          [Op.lte]: endOfDay
        }
      }
    });

    if (!vehicle) {
      console.log('No vehicle found for the given route on the specified date');
      return res.status(400).json({ message: 'No available vehicle for the given route on the specified date.' });
    }

    // Create the booking
    const booking = await Booking.create({
      user_id: req.body.user_id,
      vehicle_id: vehicle.id,
      booking_date: req.body.booking_date,
      booking_type: req.body.booking_type,
    });

    console.log('Booking created successfully:', booking);
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    res.status(500).json({ message: 'Error retrieving bookings', error: error.message });
  }
};

// Update booking
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ where: { id: req.params.id } });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Update booking fields
    booking.user_id = req.body.user_id || booking.user_id;
    booking.vehicle_id = req.body.vehicle_id || booking.vehicle_id;
    booking.booking_date = req.body.booking_date || booking.booking_date;

    await booking.save();
    res.status(200).json({ message: 'Booking updated successfully', booking });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ message: 'Error updating booking', error: error.message });
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
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Error deleting booking', error: error.message });
  }
};
