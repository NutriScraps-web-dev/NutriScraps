module.exports = (req, res, next) => {
  const role = req.role;
  if (role !== 'admin') {
    const error = new Error('You Are Not Authorized');
    error.statusCode = 401;
    throw error;
  }
  next();
};
