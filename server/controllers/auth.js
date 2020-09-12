const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
  const username = req.params.username;
  User.findOne({ username: username })
    .then((user) => {
      if (user) {
        res.status(202).json(user);
      } else {
        res.status(401).json({ message: 'User Does Not Exist' });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username: username }).then((user) => {
    if (!user) {
      return res.status(401).json({ message: 'Invalid Email or Password' });
    }
    bcrypt
      .compare(password, user.password)
      .then((doMatch) => {
        if (doMatch) {
          return res.status(200).json(user);
        }
        res
          .status(406)
          .json({ message: 'Invalid Email or Password, Try Again' });
      })
      .catch((err) => {
        console.log(err);
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
  const role = req.body.role;

  if (password !== confirmPassword) {
    return res.status(409).json({ error: 'Passwords does NOT Match' });
  }
  User.findOne({ $or: [{ username: username }, { email: email }] }).then(
    (userDoc) => {
      if (userDoc) {
        if (userDoc.username === username) {
          return res.status(403).json({ error: 'Username Already Exist' });
        } else {
          return res.status(403).json({ error: 'Email Already Exist' });
        }
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
              role: role,
            });
            return user.save();
          })
          .then((result) => {
            res.status(201).json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  );
};
exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.status(200).json({ message: ' You are Logged Out' });
  });
};
