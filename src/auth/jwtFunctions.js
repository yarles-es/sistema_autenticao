require('dotenv/config');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '1h',
};

const createToken = (infoUser) => {
  const token = jwt.sign({ data: infoUser }, secret, jwtConfig);
  return token;
};

const verifyToken = (authorization) => {
  try {
    const payload = jwt.verify(authorization, secret);
    return payload;
  } catch (error) {
    return { error };
  }
};

module.exports = {
  createToken,
  verifyToken,
};