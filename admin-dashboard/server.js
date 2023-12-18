require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const path = require('path');
const jwt = require('jsonwebtoken');
const port = 3001;

app.use(express.json()); // For parsing application/json
app.use(express.static('public')); // Serve static files from 'public' directory

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Basic user list for demonstration
const users = [{ username: "adminreich", passwordHash: process.env.ADMIN_PASSWORD_HASH }];

app.post('/login', async (req, res) => {
    const user = users.find(u => u.username === req.body.username);
    console.log("Attempting login for:", req.body.username); // Debug log

    if (!user) {
        console.log("User not found"); // Debug log
        return res.status(400).send('Cannot find user');
    }
    try {
        console.log("Stored hash for user:", user.passwordHash); // Debug log
        if (await bcrypt.compare(req.body.password, user.passwordHash)) {
            const token = jwt.sign({ username: user.username }, 'yourSecretKey', { expiresIn: '1h' });
            res.json({ token }); // Send token as JSON
        } else {
            console.log("Password comparison failed"); // Debug log
            res.status(401).send('Login failed');
        }
    } catch (error) {
        console.error("Error during login:", error); // Error log
        res.status(500).send();
    }
});

app.get('/dashboardData', (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Assuming format "Bearer token"    
    jwt.verify(token, 'yourSecretKey', (err, user) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }
        res.json({ message: "Dashboard data or user info" });
    });
});

app.post('/updateUserStatus', (req, res) => {
    const { userId, isApproved } = req.body;

    // Logic to update user status in your database
    // For example, you might have a function like this:
    // updateUserStatusInDatabase(userId, isApproved)
    // This is a placeholder. Replace it with your actual database update logic.

    // Assuming the update is successful
    res.status(200).json({ message: 'User status updated successfully' });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    });