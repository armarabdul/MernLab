const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json()); // Middleware to parse JSON data

// Connect to MongoDB (Change 'your_database_name' if needed)
mongoose.connect("mongodb://127.0.0.1:27017/studentDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("MongoDB Connection Error:", err));

// Define the Student schema
const studentSchema = new mongoose.Schema({
    usn: String,
    name: String,
    sem: Number,
    year_of_admission: Number
});

// Create a Student model
const Student = mongoose.model("Student", studentSchema);

// API to store student data in MongoDB
app.post("/addStudent", async (req, res) => {
    try {
        const { usn, name, sem, year_of_admission } = req.body;
        
        const newStudent = new Student({
            usn,
            name,
            sem,
            year_of_admission
        });

        await newStudent.save(); // Save to database
        res.status(201).json({ message: "Student added successfully!" });

    } catch (error) {
        res.status(500).json({ error: "Failed to add student" });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
