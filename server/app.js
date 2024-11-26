const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// MySQL Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql@123', // Update with your database password
  database: 'travelmanagement', // Ensure this matches your DB name
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Database connected');
  }
});

// Middleware
app.use(bodyParser.json());

// Serve static files from the 'frontend/public' directory
app.use(express.static(path.join(__dirname, 'frontend/public')));

// Endpoint to add accommodation
app.post('/add-accommodation', (req, res) => {
  // Debugging: Log the incoming request body
  console.log('Received request body:', req.body);

  const { name, type, source, destination, travelDate, availableSeats } = req.body;

  // Validation
  if (!name || !type || !source || !destination || !travelDate || !availableSeats) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // SQL query to insert accommodation
  const query = `
    INSERT INTO accommodations (name, type, source, destination, travelDate, availableSeats)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [name, type, source, destination, travelDate, availableSeats], (err, results) => {
    if (err) {
      console.error('Error inserting accommodation:', err);
      return res.status(500).json({ message: 'Failed to add accommodation', error: err });
    }

    res.status(200).json({ message: 'Accommodation added successfully', data: results });
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
