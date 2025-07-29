const express = require("express");
const router = express.Router();
const coordinators = require("../file.json");

// GET all coordinators with optional pagination
router.get("/", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const paginated = coordinators.slice(skip, skip + limit);

  res.json({
    page,
    limit,
    totalItems: coordinators.length,
    totalPages: Math.ceil(coordinators.length / limit),
    data: paginated,
  });
});

// GET a specific coordinator by ID
router.get("/:id", (req, res) => {
  const coordinator = coordinators.find((c) => c.id === req.params.id);
  if (coordinator) {
    res.json(coordinator);
  } else {
    res.status(404).json({ message: "Coordinator not found" });
  }
});

module.exports = router;
