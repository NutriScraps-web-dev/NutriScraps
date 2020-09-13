const express = require('express');
const userController = require('../controllers/user');
const isAuth = require('../middleware/isAuthorized');

const router = express.Router();

router.delete('/:id', isAuth, userController.deleteProfile);

router.put('/:id', isAuth, userController.updateProfile);

router.get('/:username', isAuth, userController.getInfo);
module.exports = router;
