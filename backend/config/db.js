const { Sequelize } = require('sequelize');

// Set up the database connection
const sequelize = new Sequelize('vehicle_booking', 'root', 'mysql@123', {
  host: 'localhost',
  dialect: 'mysql', // 'mysql' is correct, but you need to install mysql2
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
