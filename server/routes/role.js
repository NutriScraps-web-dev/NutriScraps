const express = require('express');
const roleController = require('../controllers/role');
const isAuth = require('../middleware/isAuthorized');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

router.post('/roles', isAuth, isAdmin, roleController.createRole);
//router.post('/roles', roleController.createRole);
router.get('/roles', isAuth, isAdmin, roleController.getAllRoles);
router.get('/roles/:id', isAuth, isAdmin, roleController.getRole);
router.patch('/roles/:id', isAuth, isAdmin, roleController.editRole);
router.delete('/roles/:id', isAuth, isAdmin, roleController.deleteRole);

module.exports = router;
