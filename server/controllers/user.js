const User = require('../models/user');

exports.deleteProfile = (req, res, next) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ error: `User Does not Exist ` });
      }
      res.status(200).json({ message: `The User is Deleted ` });
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
        const error = new Error('No image picked');
        error.statusCode = 404;
        throw error;
      }
      user.username = req.body.username || user.username;
      user.name.firstName = req.body.name.firstName || user.name.firstName;
      user.name.lastName = req.body.name.lastName || user.name.lastName;
      user.email = req.body.email || user.email;
      user.country = req.body.country || user.country;
      user.password = user.password;
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
        error.statusCode = 401;
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
