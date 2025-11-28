const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql2');

const db = mysql.createPool({
    host: process.env.SQLHOST,
    port: process.env.SQLPORT,
    user: process.env.SQLUSER,
    password: process.env.SQLPASSWORD,
    database: process.env.SQLDATABASE,
    ssl: {
        rejectUnauthorized: false
    }
}).promise();   // ✅ VERY IMPORTANT: enables async/await

// Test connection
db.query("SELECT NOW()")
  .then(([rows]) => {
      console.log("✅ Connected to Aiven MySQL!", rows);
  })
  .catch(err => {
      console.log("❌ Database connection failed:", err);
  });

module.exports = db;
