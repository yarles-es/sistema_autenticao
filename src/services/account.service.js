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
  const account = await Account.findOne({
    where: { email },
  });

  if(!account) return null;

  const login = await decrypt(requestPassword, account.password);

  return login;
}

module.exports = {
  createAccount,
  login,
};
