// config/initDB.js
const pool = require('./database');

(async () => {
  try {
    const connection = await pool.getConnection();

    // Create categories table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT
      )
    `);

    // Create products table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        category_id INT,
        FOREIGN KEY (category_id) REFERENCES categories(id)
      )
    `);

    // Create users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        isAdmin BOOLEAN DEFAULT false
      )
    `);

    console.log('Tables created successfully');
    connection.release();
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    pool.end();
  }
})();
