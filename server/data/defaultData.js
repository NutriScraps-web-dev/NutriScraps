const User = require('../models/user');
const Role = require('../models/role');
const bcrypt = require('bcryptjs');

exports.createDefaultData = () => {
  return new Promise((resolve, reject) => {
    let userRole;
    const password = 'superAdmin';
    const role = new Role({
      role: 'admin',
      description: 'Controls The Webpage',
      users: [],
    });
    return role
      .save()
      .then((role) => {
        userRole = role;
        return bcrypt.hash(password, 12);
      })
      .then((hashedPass) => {
        const user = new User({
          name: {
            firstName: 'Page',
            lastName: 'Admin',
          },
          username: 'super-admin',
          email: 'admin@test.com',
          password: hashedPass,
          country: 'sweden',
          bio: '',
          roleId: [userRole._id],
          roleType: 'admin',
          posts: [],
          rating: [],
          comments: [],
        });
        return user.save();
      })
      .then((result) => {
        userRole.users.push(result);
        userRole.save();
      })
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};
