const Rating = require('../models/rating');
const Comment = require('../models/comment');

exports.createRating = (req, res) => {
    const masterID = req.body.id;
    const rating;
    if(req instanceof Comment){
        rating = new Rating({
            commentID: commentID,
        });
    }
    //else if(req instanceof Receipe){
    //    rating = new Rating({
    //        receipeID: receipeID,
    //    });
    //}
    res.status(200).json(rating);
    return rating.save();
}

exports.getRating = (req, res, next) => {
    Rating.findById({ rating: req.params.id })
        .then((rating) => {
            if (!rating) {
                const error = new Error('The rating does NOT Exist');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json(rating);
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.editRatingLikes = (req, res, next) => {
    if (req instanceof Comment) {
        Rating.findById({ rating: req.body.rating })
            .then((rating) => {
                if (!rating) {
                    const error = new Error('The rating does NOT Exist');
                    error.statusCode = 404;
                    throw error;
                }
                rating.likes.addToSet(req.id);
                return rating.save();
            })
            .then((result) => {
                res.status(200).json({ message: 'rating Updated', updateCommentRating: result });
            })
            .catch((err) => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
    }

    //else if(req instanceof Receipe){}
}

exports.editRatingDislikes = (req, res, next) => {
    if (req instanceof Comment) {
        Rating.findById({ rating: req.body.rating })
            .then((rating) => {
                if (!rating) {
                    const error = new Error('The rating does NOT Exist');
                    error.statusCode = 404;
                    throw error;
                }
                rating.likes.addToSet(req.id);
                return rating.save();
            })
            .then((result) => {
                res.status(200).json({ message: 'rating Updated', updateCommentRating: result });
            })
            .catch((err) => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
    }

     //else if(req instanceof Receipe){}
}

exports.deleteRating = (req, res, next) => {
    Rating.findByIdAndDelete({ rating: req.params.id })
        .then((rating) => {
            if (!rating) {
                const error = new Error('The rating does NOT Exist');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: `The rating ${comment.id} is deleted` });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
} 