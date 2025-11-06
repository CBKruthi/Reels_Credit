const express = require('express');
const router = express.Router();
const { register, login, me } = require('../controllers/authController');
const { body } = require('express-validator');
const { auth } = require('../middlewares/auth');

router.post('/register',
  [
    body('username').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
  ],
  register
);

router.post('/login', login);
router.get('/me', auth, me);

module.exports = router;
