const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST||'localhost',
  user: process.env.DB_USER|| 'root',
  password: process.env.DB_PASSWORD|| 'admin',
  database: process.env.DB_NAME|| 'ecommerce',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
