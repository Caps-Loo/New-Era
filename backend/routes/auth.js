const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  console.log("Data register diterima:", { name, email, password });

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password berhasil di-hash:", hashedPassword);

    const [rows] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    console.log(`Registrasi berhasil untuk email: ${email}`);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error saat registrasi:", err);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("Data login diterima:", { email, password });

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];
    console.log("User ditemukan di database:", user);

    // Pastikan referensi kolom PASSWORD sesuai dengan database
    const isMatch = await bcrypt.compare(password, user.PASSWORD);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, user: { id: user.id, name: user.NAME, email: user.email } });
  } catch (err) {
    console.error("Error saat login:", err);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
});

module.exports = router;
