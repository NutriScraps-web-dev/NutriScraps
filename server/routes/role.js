const express = require('express');
const roleController = require('../controllers/role');

const router = express.Router();

router.post('/roles', roleController.createRoles);

module.exports = router;
