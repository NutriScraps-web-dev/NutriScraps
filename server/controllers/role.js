const Role = require('../models/role');

exports.createRoles = (req, res, next) => {
  const roleName = req.body.role;
  Role.findOne({ role: roleName })
    .then((roleDoc) => {
      if (roleDoc) {
        return res.status(403).json({ error: 'Role Already Exist' });
      }
      const role = new Role({
        role: roleName,
      });
      return role.save();
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
};
