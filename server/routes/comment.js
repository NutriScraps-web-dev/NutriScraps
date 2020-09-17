const express = require('express');
const commentController = require('../controllers/comment');
const isAuth = require('../middleware/isAuthorized');

const router = express.Router();

router.post('/comment', isAuth, commentController.createComment);
router.get('/comment', isAuth, commentController.getComment);
router.patch('/comment/:type', isAuth, commentController.addSubcomment);
router.delete('/comment/:type', isAuth, commentController.deleteComment);

module.exports = router;
