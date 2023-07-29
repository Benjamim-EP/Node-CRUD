const mysql = require('mysql2');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'benjamim',
  database: 'nodeapi',
});

module.exports = db;
