const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// Routes
app.use("/api/order", orderRoutes);

app.get("/", (req, res) => {
  res.send("Backend + MongoDB running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});