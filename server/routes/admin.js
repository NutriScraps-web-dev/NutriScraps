const express = require('express');
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/isAuthorized');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

router.get('/allusers', isAuth, isAdmin, adminController.getAllUsers);
router.delete('/allusers/:id', isAuth, isAdmin, adminController.deleteUser);
router.patch('/allusers/:id', isAuth, isAdmin, adminController.editUser);

module.exports = router;
