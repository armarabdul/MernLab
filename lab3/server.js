const express = require('express');
const app = express();

app.get('/check-cookies', (req, res) => {
    const cookies = req.headers.cookie || "No cookies found";
    res.send(`Cookies: ${cookies}`);
});

app.listen(3000, () => console.log("Server running on port 3000"));
