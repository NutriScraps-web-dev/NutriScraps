const express = require('express');
const roleController = require('../controllers/role');
const isAuth = require('../middleware/isAuthorized');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

router.post('/roles', isAuth, isAdmin, roleController.createRoles);

module.exports = router;
