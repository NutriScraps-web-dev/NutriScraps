const express = require('express');
const commentController = require('../controllers/comment');
const isAuth = require('../middleware/isAuthorized');

const router = express.Router();

router.post('/:id/comments',isAuth, commentController.createComment);
router.get('',isAuth, commentController.getAllComments);
router.get('/:id', isAuth, commentController.getComment);
router.post('/:parent_id', isAuth, commentController.addSubcomment);
router.delete('/:id', isAuth, commentController.deleteComment);

module.exports = router;
