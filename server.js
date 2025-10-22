import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/admin.js";
import studentRoutes from "./routes/students.js";
import feeRoutes from "./routes/fees.js";

dotenv.config();
const app = express();
// app.use(cors());
const allowedOrigins = [
  "http://localhost:5173", // for Vite local dev
  "https://shree-samartha-classes.vercel.app", // your Vercel frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // optional, if you use cookies/auth headers
  })
);

app.use((req, res, next) => {
  console.log("Request from:", req.headers.origin);
  next();
});
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/fees", feeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));