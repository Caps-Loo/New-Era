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
  
      const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
      db.query(sql, [name, email, hashedPassword], (err, result) => {
        if (err) {
          console.error("Database error saat insert user:", err);
          return res.status(500).json({ message: "Database error" });
        }
  
        res.status(201).json({ message: "User registered successfully" });
      });
    } catch (err) {
      console.error("Server error:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  

// Login User
router.post("/login", (req, res) => {
    const { email, password } = req.body;
  
    console.log("Data login diterima:", { email, password });
  
    // Validasi input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
  
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error" });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      const user = results[0];
      console.log("User ditemukan di database:", user);
  
      try {
        // Debug: log password yang dibandingkan
        console.log("Password dari user input:", password);
        console.log("Hash password dari database:", user.PASSWORD);
  
        const isMatch = await bcrypt.compare(password, user.PASSWORD); // Bandingkan password
        console.log("Password cocok:", isMatch);
  
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid email or password" });
        }
  
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
  
        res.status(200).json({ token, user: { id: user.id, name: user.NAME, email: user.email } });
      } catch (compareErr) {
        console.error("Error saat compare password:", compareErr);
        return res.status(500).json({ message: "Error while validating password" });
      }
    });
  });
  
module.exports = router;
