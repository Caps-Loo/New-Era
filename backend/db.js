const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost", 
  user: "root",      
  password: "",     
  database: "react_login",
});

db.connect((err) => {
  if (err) {
    console.error("Koneksi Database Gagal!:", err.message);
    return;
  }
  console.log("Koenksi Database Berhasil!");
});

module.exports = db;
