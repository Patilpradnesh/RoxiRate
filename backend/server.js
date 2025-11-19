require("dotenv").config();

const express = require("express");
const app = express();
const pool = require("./config/db");
const authRouters = require("./routes/authRouters");
const ratingRoutes = require("./routes/ratingRoutes");
const storeRoutes = require("./routes/storeRoutes");
const adminRoutes = require("./routes/adminRoutes");
const ownerRoutes = require("./routes/ownerRoutes");

app.use(express.json());
app.use("/api/auth", authRouters);
app.use("/api/rating", ratingRoutes);
app.use("/api/stores",storeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/owner", ownerRoutes);

pool.connect()
  .then(() => console.log("postgres connected successfully"))
  .catch(err => console.log("Database connection error", err));

app.get("/", (req, res) => {
  res.send("hello");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running ${port}`);
});
