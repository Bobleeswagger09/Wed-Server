const express = require("express");
const router = express.Router();
const coordinators = require("../file.json");

router.get("/", (req, res) => {
  res.json(coordinators);
});

router.get("/:id", (req, res) => {
  const coordinator = coordinators.find((c) => c.id === req.params.id);
  if (coordinator) {
    res.json(coordinator);
  } else {
    res.status(404).json({ message: "Coordinator not found" });
  }
});

module.exports = router;
