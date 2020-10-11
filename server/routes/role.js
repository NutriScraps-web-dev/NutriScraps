const express = require('express');
const roleController = require('../controllers/role');
const isAuth = require('../middleware/isAuthorized');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

router.post('', isAuth, isAdmin, roleController.createRole);
//router.post('/roles', roleController.createRole);
router.get('', isAuth, isAdmin, roleController.getAllRoles);
router.get('/:id', isAuth, isAdmin, roleController.getRole);
router.patch('/:id', isAuth, isAdmin, roleController.editRole);
router.delete('/:id', isAuth, isAdmin, roleController.deleteRole);

module.exports = router;
