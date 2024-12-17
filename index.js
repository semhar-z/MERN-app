const express = require("express");
const mongoose = require ("mongoose");
const cors = require("cors");
const itemRoutes = require("./routes/items.js");
const dotenv = require("dotenv");


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/items", itemRoutes);

// Connect to MongoDB

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));

// Test route
app.get("/", (req, res) => res.send("API is running..."));
