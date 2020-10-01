const express = require('express');
const commentController = require('../controllers/comment');
const isAuth = require('../middleware/isAuthorized');

const router = express.Router();

router.post('/api/comments', isAuth, commentController.createComment);
router.get('/api/comments',isAuth, commentController.getAllComments);
router.get('/api/comments/:id', isAuth, commentController.getComment);
router.post('/api/comments/:parent_id', isAuth, commentController.addSubcomment);
router.delete('/api/comments/:id', isAuth, commentController.deleteComment);

module.exports = router;
