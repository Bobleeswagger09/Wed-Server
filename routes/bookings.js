const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath = path.join(__dirname, "..", "bookings.json");

// Helper to read from file
function loadBookings() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    return [];
  }
}

// Helper to write to file
function saveBookings(bookings) {
  fs.writeFileSync(filePath, JSON.stringify(bookings, null, 2));
}

let bookings = loadBookings(); // Load initial bookings from file

// GET all bookings
router.get("/", (req, res) => {
  res.json(bookings);
});

// POST new booking
router.post("/", (req, res) => {
  const { name, email, date, guests, coordinatorId } = req.body;

  if (!name || !email || !date || !guests || !coordinatorId) {
    return res.status(400).json({ message: "Missing booking fields" });
  }

  const duplicate = bookings.find(
    (b) => b.coordinatorId === coordinatorId && b.date === date
  );

  if (duplicate) {
    return res
      .status(400)
      .json({ message: "Coordinator already booked on that date" });
  }

  const newBooking = {
    id: Date.now().toString(),
    name,
    email,
    date,
    guests,
    coordinatorId,
  };

  bookings.unshift(newBooking); // Add latest booking at the top
  saveBookings(bookings); // Persist to file

  res.status(201).json({ message: "Booking successful", booking: newBooking });
});

module.exports = router;
