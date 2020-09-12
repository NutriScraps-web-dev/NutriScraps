const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.delete('/users/:id', userController.delete);

module.exports = router;
