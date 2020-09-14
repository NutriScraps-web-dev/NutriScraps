const express = require('express');
const roleController = require('../controllers/role');
const isAuth = require('../middleware/isAuthorized');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

router.post('/roles', isAuth, isAdmin, roleController.createRoles);
router.get('/roles', isAuth, isAdmin, roleController.getAllRoles);
router.get('/roles/:type', isAuth, isAdmin, roleController.getRole);
router.patch('/roles/:type', isAuth, isAdmin, roleController.editRole);
router.delete('/roles/:type', isAuth, isAdmin, roleController.deleteRole);

module.exports = router;
