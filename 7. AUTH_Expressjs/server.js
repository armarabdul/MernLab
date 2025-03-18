const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// In-memory user storage (for lab purpose)
const users = {
    "test@example.com": {
        email: "test@example.com",
        password: bcrypt.hashSync("password123", 10) // Pre-hashed password
    }
};

// Login API (POST method)
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    if (!users[email]) {
        return res.status(401).json({ message: "User not found!" });
    }

    // Compare password with stored hash
    const isMatch = await bcrypt.compare(password, users[email].password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials!" });
    }

    res.json({ message: "Login successful!" });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
