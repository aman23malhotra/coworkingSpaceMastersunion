const express = require("express");
const dotenv = require("dotenv");
const adminRoutes = require("./Routes/adminRoutes");
const authRoutes = require("./Routes/authRoutes");
const roomBookingRoutes = require("./Routes/roomBookingRoutes");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = { origin: "http://localhost:8080/" };
app.use(cors(corsOptions));

app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/roomBooking", roomBookingRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
