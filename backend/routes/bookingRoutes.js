// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Route for creating a booking (POST /bookings)
router.post('/', bookingController.addBooking);

// Route for getting all bookings (GET /bookings)
router.get('/', bookingController.getBookings);

// Route for updating an existing booking (PUT /bookings/:id)
router.put('/:id', bookingController.updateBooking);

// Route for deleting a booking (DELETE /bookings/:id)
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
