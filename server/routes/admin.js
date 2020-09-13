const express = require('express');
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/isAuthorized');

const router = express.Router();

router.get('/allusers', isAuth, adminController.getAllUsers);

module.exports = router;
