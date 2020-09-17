const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');

exports.deleteProfile = (req, res, next) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ error: `User Does not Exist` });
      }
      res.status(200).json({ message: `The User is Deleted` });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateProfile = (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      if (!user) {
        const error = new Error('User not Found');
        error.statusCode = 404;
        throw error;
      }
      user.username = req.body.username || user.username;
      user.name.firstName = req.body.name.firstName || user.name.firstName;
      user.name.lastName = req.body.name.lastName || user.name.lastName;
      user.email = req.body.email || user.email;
      user.country = req.body.country || user.country;
      // user.password = user.password;
      user.bio = req.body.bio || user.bio;

      return user.save();
    })
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getInfo = (req, res, next) => {
  const id = req.params.id;
  User.findOne({ _id: id })
    .then((user) => {
      if (user) {
        res.status(202).json(user);
      } else {
        const error = new Error('User Does Not Exist');
        error.statusCode = 404;
        throw error;
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.changePassword = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(
      'Password Too Short, Must be at Least 8 characters Long'
    );
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const id = req.params.id;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const confirmNewPass = req.body.confirmNewPassword;
  if (newPassword !== confirmNewPass) {
    const error = new Error('Passwords Does Not Match');
    error.statusCode = 409;
    throw error;
  }
  User.findById(id)
    .then((user) => {
      if (!user) {
        const error = new Error('User not Found');
        error.statusCode = 500;
        throw error;
      }
      bcrypt
        .compare(oldPassword, user.password)
        .then((doMatch) => {
          if (!doMatch) {
            res.status(401).json({ message: 'Please Enter Correct Password' });
          }
          return bcrypt.hash(newPassword, 12);
        })
        .then((hashedPassword) => {
          user.password = hashedPassword;
          return user.save();
        })
        .then((result) => {
          res.status(200).json({ message: 'Password changed' });
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
