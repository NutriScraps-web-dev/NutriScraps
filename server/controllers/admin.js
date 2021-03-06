const User = require('../models/user');
const Role = require('../models/role');
const user = require('../models/user');

exports.getAllUsers = (req, res, next) => {
  const currentPage = +req.query.page || 1;
  const limit = +req.query.limit || 5;
  let totalUsers;
  User.find()
    .countDocuments()
    .then((count) => {
      totalUsers = count;
      return User.find()
        .skip((currentPage - 1) * limit)
        .limit(limit);
    })
    .then((userDocs) => {
      if (!userDocs) {
        const error = new Error('Can NOT Fetch Users. Please Try Again');
        error.statusCode = 500;
        throw error;
      }
      res.status(200).json({userDocs});
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteUser = (req, res, next) => {
  const selectedUserId = req.params.id;
  User.findByIdAndDelete(selectedUserId)
    .then((result) => {
      if (!result) {
        const error = new Error('User With Specified ID Does NOT Exist');
        error.statusCode = 404;
        throw error;
      }
      res
        .status(200)
        .json({ message: `The User With ID: '${selectedUserId}' Is Deleted` });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.editUser = (req, res, next) => {
  const selectedUserId = req.params.id;
  User.findById(selectedUserId)
    .then((user) => {
      if (!user) {
        const error = new Error('User With Specified ID Does NOT Exist');
        error.statusCode = 400;
        throw error;
      }
      user.bio = req.body.bio || user.bio;
      user.roleType = req.body.roleType || user.roleType;

      return user.save();
    })
    .then((result) => {
      res.status(200).json({ message: 'user Updated', updatedUser: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.message('coming from here')
        err.statusCode = 500;
      }
      next(err);
    });
};
