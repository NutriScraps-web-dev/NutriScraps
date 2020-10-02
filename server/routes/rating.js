const express = require('express');
const ratingController = require('../controllers/rating');
const isAuth = require('../middleware/isAuthorized');

const router = express.Router();

router.post('/api/ratings',isAuth, ratingController.createRating)
router.get('/api/ratings/:id', isAuth, ratingController.getRating);
router.delete('/api/ratings/:id', isAuth, ratingController.deleteRating);
router.patch('/api/ratings/:id/likes', isAuth, ratingController.editRatingLikes);
router.patch('/api/ratings/:id/dislikes', isAuth, ratingController.editRatingDislikes);

module.exports = router;