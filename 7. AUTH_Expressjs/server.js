const express = require("express");
const app = express();

app.use(express.json());

const user = { email: "test@mail.com", password: "1234" };

app.get("/", (req, res) => {
    res.send(`
        <form onsubmit="event.preventDefault();fetch('/login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({ email:e.value, password:p.value })
        }).then(r=>r.json()).then(d=>msg.innerText=d.message)">
            <input id="e" type="email" placeholder="Email" required>
            <input id="p" type="password" placeholder="Password" required>
            <button>Login</button>
        </form>
        <p id="msg"></p>
    `);
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (email === user.email && password === user.password) {
        res.json({ message: "Login Successful!" });
    } else {
        res.status(401).json({ message: "Invalid Credentials" });
    }
});

app.listen(3000, () => console.log("http://localhost:3000"));
