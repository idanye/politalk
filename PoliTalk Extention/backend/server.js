//Basic Server Setup:
const express = require('express');
const app = express();
const port = 3000;  // You can choose any port

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Set Up SQLite Database Connection
const sqlite3 = require('sqlite3').verbose();
const dbPath = '../../Server/usersInfo.db';  // Adjust this path as needed
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the usersInfo database.');
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
