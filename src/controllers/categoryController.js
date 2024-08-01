const pool = require('../config/database');

exports.getAllCategories = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories');
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  const { name, description } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO categories (name, description) VALUES (?, ?)',
      [name, description]
    );
    res.status(201).json({ id: result.insertId, name, description });
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  const { name, description } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE categories SET name = ?, description = ? WHERE id = ?',
      [name, description, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ id: req.params.id, name, description });
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const [result] = await pool.query('DELETE FROM categories WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(204).send({message: 'Category deleted'});
  } catch (error) {
    next(error);
  }
};