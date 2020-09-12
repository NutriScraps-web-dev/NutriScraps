const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.delete('/users/:id', userController.deleteProfile);

router.put('/users/:id', userController.updateProfile);

module.exports = router;
