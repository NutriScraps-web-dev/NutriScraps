const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
//const Role = require('../Models/role');

exports.getLogin = (req, res, next) => {
  const username = req.params.username;
  User.findOne({ username: username })
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

exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let foundUser;
  User.findOne({ username: username }).then((user) => {
    if (!user) {
      const error = new Error('Invalid Email or Password');
      error.statusCode = 401;
      throw error;
    }
    foundUser = user;
    bcrypt
      .compare(password, user.password)
      .then((doMatch) => {
        if (!doMatch) {
          const error = new Error('Invalid Email or Password');
          error.statusCode = 401;
          throw error;
        }
        const token = jwt.sign(
          { email: foundUser.email, userId: foundUser._id.toString() },
          'thisIsSupposedToBeVeryLongForSecurityReasons',
          { expiresIn: '1h' }
        );
        res
          .status(200)
          .json({ token: token, userId: foundUser._id.toString() });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  });
};

exports.postSignup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('invalid data');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  if (!req.file) {
    const error = new Error('No profile picture provided');
    error.statusCode = 422;
    throw error;
  }
  const firstName = req.body.name.firstName;
  const lastName = req.body.name.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const username = req.body.username;
  const country = req.body.country;
  const bio = req.body.bio;
  const profilePic = req.file.path.replace('\\', '/');
  // const roleType = req.body.role.roleType;
  // const roleId = req.body.role.roleId;

  //let userRole;

  // Role.findOne({ role: roleType })
  //   .then((roleDoc) => {
  //     if (!roleDoc) {
  //       const error = new Error('Specified Role Dose NOT exist');
  //       error.statusCode = 404;
  //       throw error;
  //     }
  //     userRole = roleDoc;
  //   })
  //   .catch((err) => {
  //     if (!err.statusCode) {
  //       err.statusCode = 500;
  //     }
  //     next(err);
  //   });

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
              // roleId: userRole,
            });
            return user.save();
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
      }
    }
  );
};

exports.postLogout = (req, res, next) => {};
