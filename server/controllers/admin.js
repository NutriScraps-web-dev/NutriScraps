const User = require('../models/user');
const Role = require('../models/role');

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
      res.status(200).json({ user: userDocs, totalUsers: totalUsers });
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
