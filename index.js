const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const coordinatorRoutes = require("./routes/coordinators");
const bookingRoutes = require("./routes/bookings");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

//  Serve static images
app.use("/images", express.static("images"));

//  API Routes
app.use("/api/coordinators", coordinatorRoutes);
app.use("/api/bookings", bookingRoutes);

//  Root check route
app.get("/", (req, res) => {
  res.send("Wedding Marketplace Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
