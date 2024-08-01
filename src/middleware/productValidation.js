const { body, validationResult } = require('express-validator');

const validateProduct = [
  body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category_id').optional().isInt().withMessage('Category ID must be an integer'),
  body('description').optional().isString().withMessage('Description must be a string'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateProduct;
