const { body, validationResult } = require('express-validator');

const validateCategory = [
  body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
  body('description').optional().isString().withMessage('Description must be a string'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateCategory;
