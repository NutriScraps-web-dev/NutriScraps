const express = require('express');
const commentController = require('../controllers/comment');
const isAuth = require('../middleware/isAuthorized');

const router = express.Router();

router.post('/:id/comments',isAuth, commentController.createComment);
router.get('/:id', isAuth, commentController.getComment);
router.get('/:id/comments',isAuth, commentController.getAllComments);
router.post('/subcomments/:parent_id', isAuth, commentController.addSubcomment);
router.delete('/comments/:id', isAuth, commentController.deleteComment);

module.exports = router;
