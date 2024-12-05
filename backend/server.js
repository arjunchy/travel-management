// server.js
const express = require('express');
const cors = require('cors');
<<<<<<< HEAD
const sequelize = require('./config/db'); 
=======
const sequelize = require('./config/db'); // Import your Sequelize configuration
>>>>>>> master

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3001' })); // Allow connections from React app

// Importing routes
const vehicleRoutes = require('./routes/vehicleRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Using routes
<<<<<<< HEAD
app.use('/vehicles', vehicleRoutes);  
app.use('/bookings', bookingRoutes);  
=======
app.use('/vehicles', vehicleRoutes);
app.use('/bookings', bookingRoutes);
>>>>>>> master

// Syncing with the database
sequelize.sync({ force: false }) // Change to true for initial setup (use with caution)
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

<<<<<<< HEAD
const PORT = process.env.PORT || 3000;  
=======
// Start the server
const PORT = process.env.PORT || 3000;
>>>>>>> master
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
