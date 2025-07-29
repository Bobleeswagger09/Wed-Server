const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath = path.join(__dirname, "..", "bookings.json");

function loadBookings() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    return [];
  }
}

function saveBookings(bookings) {
  fs.writeFileSync(filePath, JSON.stringify(bookings, null, 2));
}

let bookings = loadBookings();

// ✅ GET all bookings with pagination
router.get("/", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const paginated = bookings.slice(skip, skip + limit);

  res.json({
    page,
    limit,
    totalItems: bookings.length,
    totalPages: Math.ceil(bookings.length / limit),
    data: paginated,
  });
});

// ✅ POST a new booking
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

  bookings.unshift(newBooking);
  saveBookings(bookings);

  res.status(201).json({ message: "Booking successful", booking: newBooking });
});

module.exports = router;
