const mysql = require("mysql2");

// membuat variabel pool untuk menampung data ke db mysql
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// mendapatkan koneksi dari pool
// pool.getConnection(function(err, connection) {
//   if (err) throw err;
//   console.log("Database Connected");
// });

module.exports = pool.promise();