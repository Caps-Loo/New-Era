const express = require("express");
const router = express.Router();
const pool = require("../db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "./uploads";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/", upload.fields([{ name: "resume" }, { name: "photo" }]), async (req, res) => {
  try {
    console.log("Files received:", req.files);
    console.log("Body received:", req.body);

    const {
      user_id,
      job_id,
      name,
      email,
      phone,
      address,
      linkedin,
      expectedSalary,
      education,
      experience,
      message,
    } = req.body;

    if (!user_id) {
      return res.status(400).json({ success: false, message: "User ID is required!" });
    }

    const resume_path = req.files["resume"] ? req.files["resume"][0].path : null;
    const photo_path = req.files["photo"] ? req.files["photo"][0].path : null;
    const applied_at = new Date();

    const query = `
      INSERT INTO applications 
      (user_id, job_id, name, email, phone, address, linkedin, expected_salary, education, experience, message, resume_path, photo_path, applied_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      user_id,
      job_id ?? null,
      name ?? null,
      email ?? null,
      phone ?? null,
      address ?? null,
      linkedin ?? null,
      expectedSalary ?? null,
      education ?? null,
      experience ?? null,
      message ?? null,
      resume_path ?? null,
      photo_path ?? null,
      applied_at,
    ];

    await pool.execute(query, values);

    res.status(201).json({ success: true, message: "Lamaran berhasil dikirim!" });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ success: false, message: "Terjadi kesalahan pada server." });
  }
});

module.exports = router;
