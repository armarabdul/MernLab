const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON data

// API endpoint to receive fruit data
app.post("/addFruit", (req, res) => {
    const { name, price } = req.body;
    
    if (!name || !price) {
        return res.status(400).json({ error: "Fruit name and price are required!" });
    }

    console.log(`Received: Fruit - ${name}, Price - ${price}`);
    res.status(200).json({ message: "Fruit data received successfully!" });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));