// models/Vehicle.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming you have a database connection

const Vehicle = sequelize.define('Vehicle', {
  // Define model attributes here
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  source: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departure_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  // Remove accommodation_type from here
});

module.exports = Vehicle;