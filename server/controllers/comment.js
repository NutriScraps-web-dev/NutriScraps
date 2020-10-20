const Comment = require('../models/comment');
const User = require('../models/user');
const Recipe = require('../models/recipe');
const mongoose = require('mongoose');

exports.createComment = (req, res, next) => {
  const commentReviewer = mongoose.Types.ObjectId(req.userId);
  const commentContent = req.body.content;
  const recipeId = mongoose.Types.ObjectId(req.params.id)
  let tem_comment = null;
  const comment = new Comment({
    reviewer: commentReviewer,
    content: commentContent,
    rating: [],
    subcomments: [],
    recipe: recipeId
  });
  return comment
    .save()
    .then((result) => {
      tem_comment = result;
      return User.findById(commentReviewer);
    })
    .then((user) => {
      user.comments.push(tem_comment);
      return user.save();
    }).then(result=>{
      return Recipe.findById(recipeId)
    }).then(recipe => {
      recipe.comments.push(tem_comment)
      return recipe.save();
    })
    .then((result) => {
      res.status(200).json(tem_comment);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getComment = (req, res, next) => {
  Comment.findById(req.params.id)
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
  const recipeId = req.params.id
  Comment.find({recipe: recipeId})
    .then((comment) => {
      if (!comment) {
        const error = new Error('The comment does NOT Exist');
        error.statusCode = 400;
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
  Comment.findByIdAndDelete(req.params.id)
    .then((comment) => {
      return User.updateOne(
        { comments: req.params.id },
        { $pull: { comments: req.params.id } }
      );
    }).then(result => {
      return Recipe.updateOne (
        { comments: req.params.id },
        { $pull: { comments: req.params.id } }
      )
    })
    .then((result) => {
      res.status(200).json({ message: `The comment is deleted` });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.addSubcomment = (req, res, next) => {
  const commentReviewer = mongoose.Types.ObjectId(req.userId);
  const commentContent = req.body.content;
  const parentComment = req.params.parent_id;
  let tem_comment = null;
  const comment = new Comment({
    reviewer: commentReviewer,
    content: commentContent,
    rating: [],
    subcomments: [],
  });
  return comment
    .save()
    .then((result) => {
      tem_comment = result;
      return User.findById(commentReviewer);
    })
    .then((user) => {
      user.comments.push(tem_comment);
      return user.save();
    })
    .then((result) => {
      return Comment.findById(parentComment);
    })
    .then((parentCom) => {
      parentCom.subcomments.push(tem_comment);
      return parentCom.save();
    })
    .then((result) => {
      res.status(200).json(tem_comment);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
