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


  const eventticket = `CREATE TABLE IF NOT EXISTS eventTicket (
    id VARCHAR(100) PRIMARY KEY,
    INVITEUSEREMAIL VARCHAR(500) NOT NULL,
    EVENTID VARCHAR(100) NOT NULL,
    EVENTUSERID VARCHAR(100) NOT NULL,
    QRURL TEXT NOT NULL,
    FILENAME TEXT NOT NULL,
    STATUS varchar(20) DEFAULT 'PENDING',
    CREATEDAT varchar(100) NOT NULL
);`

//  const eventticket = `DROP TABLE eventTicket;`


db.query(eventticket)
  .then(([rows]) => {
      console.log("✅ Created eventTicket table:", rows);
  })
  .catch(err => {
      console.log("❌ Error creating eventTicket table:", err);
  });

module.exports = db;
