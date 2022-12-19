const { userService, accountService } = require('../services');
const { createToken, verifyToken } = require('../auth/jwtFunctions');

const createUser = async (req, res) => {
  const infoUser = req.body;
  const newUser = await userService.createUser(infoUser);

  const newAccount = await accountService.createAccount(newUser.dataValues.id, infoUser);
  if(newUser.dataValues.email && newAccount.dataValues.email) {
    const token = createToken(newAccount.dataValues.email);
    return res.status(201).json({ 
      message: `Conta cadastrada com sucesso no email: ${newAccount.dataValues.email}`,
      token,
    });
  }
  return res.status(500).json({ message: "erro interno" });
}

module.exports = {
  createUser,
};