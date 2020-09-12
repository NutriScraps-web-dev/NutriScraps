const User = require('../models/user');

exports.delete = (req, res, next) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ error: `User Does not Exist ` });
      }
      res.status(200).json({ message: `The User is Deleted ` });
    })
    .catch((err) => {
      console.log(err);
    });
};
