const User = require('../models/user');
const Role = require('../models/role');

exports.createDefaultData = () => {
  return new Promise((resolve, reject) => {
    let userRole;
    const role = new Role({
      role: 'admin',
      description: 'Controls The Webpage',
      users: [],
    });
    return role
      .save()
      .then((result) => {
        userRole = result;
        const user = new User({
          name: {
            firstName: 'Page',
            lastName: 'Admin',
          },
          username: 'super-admin',
          email: 'admin@test.com',
          password: 'superAdmin',
          country: 'sweden',
          bio: '',
          roleId: [result._id],
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
