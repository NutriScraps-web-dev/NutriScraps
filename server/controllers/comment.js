const Comment = require('../models/comment');
const User = require('../models/user');
const mongoose = require('mongoose');

exports.createComment = (req, res, next) => {
  const commentReviewer = mongoose.Types.ObjectId(req.userId);
  const commentContent = req.body.content;
  let commentCopy = null;
  const comment = new Comment({
    reviewer: commentReviewer,
    content: commentContent,
    rating: [],
    subcomments: [],
  });
  return comment
    .save()
    .then((result) => {
      commentCopy = result;
      return User.findById(commentReviewer);
    })
    .then((user) => {
      user.comments.push(commentCopy);
      return user.save();
    })
    .then((result) => {
      res.status(200).json(commentCopy);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getComment = (req, res, next) => {
  Comment.findById({ comment: req.params.id })
    .then((comment) => {
      if (!comment) {
        const error = new Error('The comment does NOT Exist');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json(comment);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getAllComments = (req, res, next) => {
  Comment.find()
    .then((comment) => {
      if (!comment) {
        const error = new Error('The comment does NOT Exist');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json(comment);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteComment = (req, res, next) => {
  Comment.findByIdAndDelete({ comment: req.params.id })
    .then((comment) => {
      if (!comment) {
        const error = new Error('The comment does NOT exist');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: `The comment ${comment.id} is deleted` });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.addSubcomment = (req, res, next) => {
  Comment.findById({ comment: req.params.id })
    .then((comment) => {
      if (!comment) {
        const error = new Error('The comment does NOT exist');
        error.statusCode = 404;
        throw error;
      }
      const subcomment = new Comment({
        reviewer: commentReviewer,
        content: commentContent,
      });
      subcomment.save();
      comment.subcomment.addToSet(subcomment.id);
    })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
