// routes/vehicleRoutes.js
const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// Route for adding a new vehicle (POST /vehicles)
router.post('/', vehicleController.addVehicle);

// Route for getting all vehicles (GET /vehicles)
router.get('/', vehicleController.getVehicles);

module.exports = router;
