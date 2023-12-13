const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const path = require('path');

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
            res.send('Success');
        } else {
            res.send('Not Allowed');
        }
    } catch {
        res.status(500).send();
    }
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});

async function hashPassword(password) {
    const saltRounds = 10; // It's common to use 10 rounds
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error(error);
        throw new Error('Password hashing failed');
    }
}