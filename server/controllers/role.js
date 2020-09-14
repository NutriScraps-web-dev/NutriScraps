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

exports.getRole = (req, res, next) => {
  const roleType = req.params.type;
  Role.findOne({ role: roleType })
    .then((role) => {
      if (!role) {
        const error = new Error('The role does NOT Exist');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json(role);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.editRole = (req, res, next) => {
  const roleType = req.params.type;
  Role.findOne({ role: roleType })
    .then((role) => {
      if (!role) {
        const error = new Error('The role does NOT Exist');
        error.statusCode = 404;
        throw error;
      }
      role.role = req.body.role || role.role;
      role.description = req.body.description || role.description;
      return role.save();
    })
    .then((result) => {
      res.status(200).json({ message: 'Role Updated', updatedRole: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteRole = (req, res, next) => {
  const roleType = req.params.type;
  Role.findOneAndDelete({ role: roleType })
    .then((role) => {
      if (!role) {
        const error = new Error('The role does NOT Exist');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: `The ${role} Is Deleted` });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
