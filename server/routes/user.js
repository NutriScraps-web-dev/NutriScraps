const express = require('express');
const userController = require('../controllers/user');
const isAuth = require('../middleware/isAuthorized');

const router = express.Router();

router.delete('/:id', isAuth, userController.deleteProfile);

//needs to be revisited
router.patch('/:id', isAuth, userController.updateProfile);

router.get('/:id', isAuth, userController.getInfo);
module.exports = router;
