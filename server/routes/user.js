const express = require('express');
const userController = require('../controllers/user');
const isAuth = require('../middleware/isAuthorized');
const { body } = require('express-validator');

const router = express.Router();

router.delete('/:id', isAuth, userController.deleteProfile);

router.patch('/:id', isAuth, userController.updateProfile);

router.get('/:id', isAuth, userController.getInfo);

router.patch(
  '/:id/password',
  isAuth,
  [body('newPassword').trim().isLength({ min: 8 })],
  userController.changePassword
);

module.exports = router;
