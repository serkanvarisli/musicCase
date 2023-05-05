const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "muzik",
});
pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Connected to mysql");
});

module.exports = pool.promise();
