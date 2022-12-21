require('dotenv/config');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const validateToken = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  try {
    const validate = jwt.verify(authorization, secret);
    req.user = validate
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou invalido' })
  }
};

module.exports = validateToken;