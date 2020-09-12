const express = require('express');
const roleController = require('../controllers/role');

const router = express.Router();

router.post('/create', roleController.createRoles);

module.exports = router;
