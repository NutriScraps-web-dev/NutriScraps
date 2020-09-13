const express = require('express');
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/isAuthorized');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

router.get('/allusers', isAuth, isAdmin, adminController.getAllUsers);

module.exports = router;
