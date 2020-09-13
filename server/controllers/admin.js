const User = require('../models/user');
const Role = require('../models/role');

exports.getAllUsers = (req, res, next) => {
  const role = req.role;
  if (role !== 'admin') {
    const error = new Error('You Are Not Authorized');
    error.statusCode = 401;
    throw error;
  }
  User.find()
    .then((userDocs) => {
      if (!userDocs) {
        const error = new Error('Can NOT Fetch Users. Please Try Again');
        error.statusCode = 500;
        throw error;
      }
      res.status(200).json({ user: userDocs });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
