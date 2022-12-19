const { Account } = require('../models');
const { encrypt } = require('../auth/bcriptFunctions');

const createAccount = async (idUser, { email, password }) => {
  const hash = await encrypt(password);
  const newAccount = await Account.create({
    idUser,
    email,
    password: hash,
  });
  return newAccount
}

module.exports = {
  createAccount,
}
