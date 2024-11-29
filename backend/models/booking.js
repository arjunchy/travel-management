module.exports = (sequelize, DataTypes) => {
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
              model: 'Vehicles', // Ensure this matches your table name
              key: 'id',
          },
          allowNull: false,
      },
      booking_date: {
          type: DataTypes.DATE,
          allowNull: false,
      },
  }, {});

  return Booking;
};