const sqlite3 = require('sqlite3').verbose();

// Open a database connection
let db = new sqlite3.Database('../../database/extensionUsers.db', (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');

        // Create table
        db.run(`CREATE TABLE extensionUsers (
            UUID INTEGER UNIQUE,
            Email TEXT,
            FullName TEXT,
            isGoogleVerified INTEGER,
            isAdminApproved INTEGER,
            linkedInUsersContacted TEXT
        )`, (err) => {
            if (err) {
                // Table already created
                console.error(err.message);
            } else {
                console.log("Table 'extensionUsers' created successfully.");
                // You can populate the table with some initial data here if needed
            }
        });
    }
});

// Close the database connection
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Closed the database connection.');
});
