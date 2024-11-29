// controllers/vehicleController.js
const Vehicle = require('../models/Vehicle'); // Adjust this based on your file's actual location


// Add a new vehicle
exports.addVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.create({
            type: req.body.type,
            source: req.body.source,
            destination: req.body.destination,
            departure_time: req.body.departure_time,
        });
        res.status(201).json(vehicle);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding vehicle' });
    }
};

// Get all vehicles
exports.getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.findAll();
        res.status(200).json(vehicles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving vehicles' });
    }
};
