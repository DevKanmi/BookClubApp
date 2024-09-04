const { body, validationResult } = require('express-validator');

// Validation middleware for signup
const validateSignup = [
    body('email')
        .isEmail().withMessage('Invalid email address')
        .normalizeEmail(),
    
    body('username')
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
    
    body('name')
        .notEmpty().withMessage('Name is required'),
    
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
]

module.exports = { validateSignup }


