const pool = require('../config/database'); 

const isAdmin = async (req, res, next) => {
  const userId = req.user.userId;

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    const user = rows[0];

    if (user && user.isAdmin) {
      next(); 
    } else {
      res.status(403).json({ message: 'Access denied. Admin rights required.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = isAdmin;
