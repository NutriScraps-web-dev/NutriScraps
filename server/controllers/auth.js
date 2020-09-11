const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {};

exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username: username }).then((user) => {
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not Found' })
        .redirect('/login');
    }
    bcrypt
      .compare(password, user.password)
      .then((doMatch) => {
        if (doMatch) {
          return res.status(200).json(user);
        }
        res
          .status(406)
          .json({ message: 'Wrong Password, Try Again' })
          .redirect('/login');
      })
      .catch((err) => {
        console.log(err);
        res.redirect('/login');
      });
  });
};
exports.getSignup = (req, res, next) => {};

exports.postSignup = (req, res, next) => {
  const firstName = req.body.name.firstName;
  const lastName = req.body.name.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const username = req.body.username;
  const country = req.body.country;
  const bio = req.body.bio;
  const profilePic = req.body.profilePic;

  if (password !== confirmPassword) {
    res
      .status(409)
      .json({ message: 'Passwords does NOT Match' })
      .redirect('/signup');
  } else {
    return bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          name: {
            firstName: firstName,
            lastName: lastName,
          },
          username: username,
          email: email,
          password: hashedPassword,
          country: country,
          bio: bio,
          profilePic: profilePic,
        });
        return user.save();
      })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
exports.postLogout = (req, res, next) => {};
