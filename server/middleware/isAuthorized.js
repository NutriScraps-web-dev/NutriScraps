const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // the token should be sent as a header and it should start with "Bearer "
  const headerWithToken = req.get('Authorization');
  if (!headerWithToken) {
    const error = new Error('User Not Authenticated');
    err.statusCode = 401;
    throw error;
  }
  const token = headerWithToken.split(' ')[1];

  let decodedToken;
  try {
    decodedToken = jwt.verify(
      token,
      'thisIsSupposedToBeVeryLongForSecurityReasons'
    );
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('User Not Authenticated');
    err.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  req.role = decodedToken.userRole;
  req.token = decodedToken;
  next();
};
