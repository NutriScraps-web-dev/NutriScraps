const Role = require('../models/role');

exports.createRoles = (req, res, next) => {
  const roleName = req.body.role;
  const description = req.body.description;
  Role.findOne({ role: roleName })
    .then((roleDoc) => {
      if (roleDoc) {
        return res.status(403).json({ error: 'Role Already Exist' });
      }
      const role = new Role({
        role: roleName,
        description: description,
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

exports.getAllRoles = (req, res, next) => {
  const sortBy = req.query.sort || '';
  Role.find()
    .sort(sortBy)
    .then((roles) => {
      if (!roles) {
        const error = new Error('Can NOT Fetch Roles. Please Try Again');
        error.statusCode = 500;
        throw error;
      }
      res.status(202).json(roles);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.getRole = (req, res, next) => {};
exports.editRole = (req, res, next) => {};
exports.deleteRoles = (req, res, next) => {};
