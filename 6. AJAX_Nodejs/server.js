const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (_, res) => {
    res.send(`
        <input placeholder="Fruit" id="f"><input placeholder="Price" id="p" type="number">
        <button onclick="fetch('/add', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({ name: f.value, price: p.value })
        }).then(r=>r.json()).then(d=>msg.innerText=d.message)">Send</button>
        <p id="msg"></p>
    `);
});

app.post("/add", (req, res) => {
    console.log(req.body);
    res.json({ message: "Received" });
});

app.listen(3000, () => console.log("http://localhost:3000"));
