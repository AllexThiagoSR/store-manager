const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  user: 'root',
  password: 'password',
  host: 'db',
  port: 3306,
  database: 'StoreManager',
  waitForConnections: true,
});

module.exports = connection;