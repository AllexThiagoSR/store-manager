const { createPool } = require('mysql2/promise');

const connection = createPool({
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  host: process.env.MYSQL_HOSTNAME || 'db',
  port: process.env.MYSQL_PORT || 3306,
  database: process.env.MYSQL_DATABASE || 'StoreManager',
  waitForConnections: true,
});

module.exports = connection;