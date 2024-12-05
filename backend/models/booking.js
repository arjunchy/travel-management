const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    vehicle_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Vehicles', 
            key: 'id',
        },
        allowNull: false,
    },
    booking_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    booking_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {});

module.exports = Booking; 