const pool = require('../config/database');

exports.getAllProducts = async (req, res, next) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
    `);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.id = ?
    `, [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  const { name, description, price, category_id } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO products (name, description, price, category_id) VALUES (?, ?, ?, ?)',
      [name, description, price, category_id]
    );
    res.status(201).json({ id: result.insertId, name, description, price, category_id });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  const { name, description, price, category_id } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE products SET name = ?, description = ?, price = ?, category_id = ? WHERE id = ?',
      [name, description, price, category_id, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ id: req.params.id, name, description, price, category_id });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(204).send({ message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
};

exports.getProductsByCategory = async (req, res, next) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      JOIN categories c ON p.category_id = c.id 
      WHERE c.id = ?
    `, [req.params.categoryId]);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};