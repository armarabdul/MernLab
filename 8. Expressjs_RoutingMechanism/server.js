const express = require("express");
const app = express();

// Function to find prime numbers < 100
const findPrimes = () => {
    let primes = [];
    for (let num = 2; num < 100; num++) {
        let isPrime = true;
        for (let i = 2; i * i <= num; i++) {
            if (num % i === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) primes.push(num);
    }
    return primes;
};

// Function to find cube numbers < 100
const findCubes = () => {
    let cubes = [];
    for (let i = 1; i ** 3 < 100; i++) {
        cubes.push(i ** 3);
    }
    return cubes;
};

// Route to find prime numbers < 100
app.get("/find_prime_100", (req, res) => {
    res.json({ primes: findPrimes() });
});

// Route to find cube numbers < 100
app.get("/find_cube_100", (req, res) => {
    res.json({ cubes: findCubes() });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));