const express = require('express');
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/isAuthorized');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

router.get('/users', isAuth, isAdmin, adminController.getAllUsers);
router.delete('/users/:id', isAuth, isAdmin, adminController.deleteUser);
router.patch('/users/:id', isAuth, isAdmin, adminController.editUser);

module.exports = router;
