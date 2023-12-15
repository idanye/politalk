//Basic Server Setup:
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const port = 3000;  // You can choose any port

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Set Up SQLite Database Connection
const sqlite3 = require('sqlite3').verbose();
const dbPath = '../../database/usersinfo.db'; 
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  else {
    console.log('Connected to the usersinfo database.');
  }
});

//API Endpoint to Fetch a Student's Information
app.get('/student/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM UsersInfo WHERE IndexID = ?`;

  db.get(sql, [id], (err, row) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": row
    });
  });
});

// Endpoint to fetch three random students
app.get('/random-students', (req, res) => {
  const sql = `SELECT * FROM UsersInfo ORDER BY RANDOM() LIMIT 3`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    });
  });
});

/****************************************** Connection to Users db *******************************************/

// Middleware for parsing JSON bodies
app.use(express.json());

// Connection to the second database
const exUsersDB = new sqlite3.Database('../../database/extensionUsers.db', (err) => {
  if (err) {
      console.error(err.message);
  } else {
      console.log('Connected to the extensionUsers database.');
  }
});

// Endpoint to handle user data from Google login
app.post('/api/add-extension-user', (req, res) => {
  console.log(req.body);
  const { UUID, Email, FullName, isGoogleVerified, isAdminVerified } = req.body;
  
  // Check if the user already exists
  exUsersDB.get("SELECT * FROM extensionUsers WHERE UUID = ?", [UUID], (err, row) => {
      if (err) {
          res.status(500).send({ error: err.message });
          return;
      }

      // If the user doesn't exist, insert new record
      if (!row) {
          const insertQuery = `INSERT INTO extensionUsers (UUID, Email, FullName, isGoogleVerified, isAdminVerified) VALUES (?, ?, ?, ?, ?)`;
          exUsersDB.run(insertQuery, [UUID, Email, FullName, isGoogleVerified, isAdminVerified], (err) => {
              if (err) {
                  res.status(500).send({ error: err.message });
                  return;
              }
              res.send({ message: 'User added successfully' });
          });
      } else {
          // User already exists
          res.send({ message: 'User already exists' });
      }
  });
});