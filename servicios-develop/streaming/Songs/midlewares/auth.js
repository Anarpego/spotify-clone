const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const bearerToken = req.headers['x-auth-token'];
    if (!bearerToken) return res.status(403).send('Access denied.');

    const token = bearerToken.split(' ')[1];

    jwt.verify(token, 'SEED', (error, authData) => {
      if (error) {
        return res.status(403).send(error);
      } else {
        req.user = authData;
      }
    });

    // console.log(req.user)
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};
