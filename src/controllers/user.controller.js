const { userService, accountService } = require('../services');
const { createToken } = require('../auth/jwtFunctions');

const createUser = async (req, res) => {
  const infoUser = req.body;
  const newUser = await userService.createUser(infoUser);

  const newAccount = await accountService.createAccount(newUser.id, infoUser);
  if(newUser.email && newAccount.email) {
    const token = createToken(newAccount.email);
    return res.status(201).json({ 
      message: `Conta cadastrada com sucesso no email: ${newAccount.email}`,
      token,
    });
  }
  return res.status(500).json({ message: "erro interno" });
}

module.exports = {
  createUser,
};