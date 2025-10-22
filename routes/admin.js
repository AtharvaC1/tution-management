import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";
import auth from "../middleware/auth.js";

dotenv.config();
const router = express.Router();

// POST /api/admin/register  (one-time use - protect or remove after creating initial admin)
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    let admin = await Admin.findOne({ username });
    if (admin) return res.status(400).json({ message: "Admin already exists" });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    admin = new Admin({ username, password: hash });
    await admin.save();
    res.json({ message: "Admin created" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/admin/login
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    const payload = { admin: { id: admin.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/admin/me  (returns basic admin info)
router.get("/me", auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;