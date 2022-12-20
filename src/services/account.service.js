const { Account } = require('../models');
const { encrypt, decrypt } = require('../auth/bcriptFunctions');

const createAccount = async (idUser, { email, password }) => {
  const hash = await encrypt(password);
  const newAccount = await Account.create({
    idUser,
    email,
    password: hash,
  });
  return newAccount;
}

const login = async (email,requestPassword) => {
  const { password } = await Account.findOne({
    where: { email },
  });
  const login = await decrypt(requestPassword, password);

  return login;
}

module.exports = {
  createAccount,
  login,
};
