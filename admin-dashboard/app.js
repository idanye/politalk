const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

async function verifyPassword(userInputPassword, storedHashedPassword) {
    return await bcrypt.compare(userInputPassword, storedHashedPassword);
}

async function registerUser(username, password) {
    const hashedPassword = await hashPassword(password);
    console.log(`Registering user ${username} with password hash: ${hashedPassword}`);
    // Here, you would store username and hashedPassword in your database
}

async function loginUser(username, password, storedHashedPassword) {
    const isValidPassword = await verifyPassword(password, storedHashedPassword);
    if (isValidPassword) {
        console.log(`User ${username} logged in successfully.`);
    } else {
        console.log(`Invalid password for user ${username}.`);
    }
}

async function main() {
    const username = "adminreich";
    const password = "Poli1948*";

    // Simulate user registration
    await registerUser(username, password);

    // Simulate fetching stored hash from the database
    const storedHashedPassword = await hashPassword(password);

    // Simulate user login
    await loginUser(username, password, storedHashedPassword);
}

main().catch(console.error);
