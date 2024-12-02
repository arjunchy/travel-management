// server.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db'); 

const app = express();
app.use(express.json());
app.use(cors());

// Importing routes
const vehicleRoutes = require('./routes/vehicleRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Using routes
app.use('/vehicles', vehicleRoutes);  
app.use('/bookings', bookingRoutes);  

// Syncing with the database and starting the server
sequelize.sync({ force: false })  // Set to 'true' only for initial setup (to create tables)
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
