// Import required modules (if needed)
const express = require("express"); // Optional, for server-based apps

// Define a car object
let car = {
    brand: "Toyota",
    model: "Corolla",
    year: 2022,
    color: "Blue"
};

// Print the object properties
console.log("Car Object:", car);

// Get keys of the object
let keys = Object.keys(car);

// Delete the second property (model)
delete car[keys[1]]; // Deletes "model"

console.log("After Deleting Second Property:", car);

// Get the length of the object
let length = Object.keys(car).length;
console.log("Number of Properties:", length);

// Export module (optional)
module.exports = car;
