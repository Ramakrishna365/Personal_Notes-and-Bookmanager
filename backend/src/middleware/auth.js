const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // For now, allow requests without token but set userId to 'default'
    // In production, you would require a valid token
    req.userId = 'default-user';
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
    if (err) {
      req.userId = 'default-user';
      return next();
    }
    req.userId = user.id;
    next();
  });
};

module.exports = { authenticateToken };
