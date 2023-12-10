const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('Server'));

// Connect to the existing SQLite database
const db = new sqlite3.Database('./database/usersinfo.db');

// Routes (example route)
app.get('/', (req, res) => {
  // Fetch all users from the existing UsersInfo table
  db.all('SELECT * FROM UsersInfo', (err, users) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      // Render the admin dashboard view with user data
      res.sendFile(__dirname + '/admin_dashboard.html');
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
