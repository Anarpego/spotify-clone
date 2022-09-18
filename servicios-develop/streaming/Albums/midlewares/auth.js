const jwt = require('jsonwebtoken');

const JWT_KEY = process.env.JWT_KEY;

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).send({ msg: 'No envio un token de autorizacion' });
  }
  console.log(token);
  global.log.debug(`Decodificando token: ${token}`);
  console.log(JWT_KEY);
  try {
    const decoded = jwt.verify(token, JWT_KEY);
    // { userId: 'leoag@gmail.com' }
    req.userId = decoded.userId;
    global.log.debug(`Usuario decodificado correctamente: ${req.userId}`);
    next();
  } catch (err) {
    global.log.error(`Error decodificando JWT`);
    global.log.error(err);
    return res.status(401).send({ msg: 'Token invalido' });
  }
};
