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
  const firstName = req.body.name.firstName;
  const lastName = req.body.name.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const username = req.body.username;
  const country = req.body.country;
  const bio = req.body.bio;
  let profilePic = req.body.profilePic;
  if (req.file) {
    profilePic = req.file.path.replace('\\', '/');
  }
  if (!profilePic) {
    const error = new Error('No image picked');
    error.statusCode = 422;
    throw error;
  }
  if (password !== confirmPassword) {
    const error = new Error('Passwords does NOT Match');
    error.statusCode = 409;
    throw error;
  }
  User.findById(id)
    .then((user) => {
      if (!user) {
        const error = new Error('No image picked');
        error.statusCode = 404;
        throw error;
      }
      user.username = username;
      user.name.firstName = firstName;
      user.name.lastName = lastName;
      user.email = email;
      user.country = country;
      user.password = password;
      user.confirmPassword = confirmPassword;
      user.profilePic = profilePic;
      user.bio = bio;

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
