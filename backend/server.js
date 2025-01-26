const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const applicationRoutes = require("./routes/application"); // Import rute lamaran

const app = express();

app.use(cors());

// **express.json() tetap diperlukan untuk rute lain, tapi multer menangani multipart/form-data**
app.use(express.json());

// Rute
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes); // Tambahkan rute lamaran

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("Backend is running!");
});
