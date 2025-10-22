import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/admin.js";
import studentRoutes from "./routes/students.js";
import feeRoutes from "./routes/fees.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/fees", feeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));