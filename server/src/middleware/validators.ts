import { body, check } from 'express-validator';

const register =
  [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email must contain a valid email address'),
  check('password')
    .matches(/[A-Z]/)
    .withMessage('Must contain at least one uppercase')
    .matches(/\d/)
    .withMessage('Must contain at least one number')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/\W/)
    .withMessage('Password must contain at least one symbol')
]

const category = [
  check('category')
    .trim()
    .not()
    .matches(/[0-9]/)
    .withMessage('Numbers are not allowed')
];

const cuisines = [
  check('cuisines')
    .trim()
    .not()
    .matches(/[0-9]/)
    .withMessage('Numbers are not allowed')
];

export default {
  category,
  register,
  cuisines
}