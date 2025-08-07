const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { register, login } = require('../controllers/authcontroller');


router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
  ],
  register
);


router.post(
  '/login',
  [
    body('email').exists().isEmail(),
    body('password').exists(),
  ],
  login
);

module.exports = router;
