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
const users = [{ username: "adminreich", passwordHash: "2b$10$15z1NibFcggLc0R7WUtr5OmJedlKlJavcPNjRQjd2vG0QKYvhAGVa" }];

app.post('/login', async (req, res) => {
    const user = users.find(u => u.username === req.body.username);
    if (!user) {
        return res.status(400).send('Cannot find user');
    }
    try {
        if (await bcrypt.compare(req.body.password, user.passwordHash)) {
            const token = jwt.sign({ username: user.username }, 'yourSecretKey', { expiresIn: '1h' });
            res.json({ token }); // Send token as JSON
        } else {
            res.status(401).send('Login failed');
        }
    } catch {
        res.status(500).json({ message: 'Error during login process' });
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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    });