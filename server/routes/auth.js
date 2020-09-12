const express = require('express');
const authController = require('../controllers/auth');
const { body } = require('express-validator/check');

const router = express.Router();

router.get('/login/:username', authController.getLogin);

router.post('/login', authController.postLogin);

router.post(
  '/signup',
  [
    body('name.firstName').trim().not().isEmpty(),
    body('username').trim().not().isEmpty(),
    body('name.lastName').trim().not().isEmpty(),
    body('email').isEmail().withMessage('Please Enter a valid Email'),
    body('password').trim().isLength({ min: 8 }),
  ],
  authController.postSignup
);

router.post('/logout', authController.postLogout);

module.exports = router;
