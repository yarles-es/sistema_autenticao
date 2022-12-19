const bcrypt = require('bcrypt');

const encrypt = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

const decrypt = async (password, dataBasePassword) => {
  const hash = await bcrypt.compare(password, dataBasePassword);
  return hash;
};

module.exports = {
  encrypt,
  decrypt,
};