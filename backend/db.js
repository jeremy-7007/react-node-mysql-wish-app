const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "huy_le7007",
  database: "wish-app",
});

module.exports = db;
