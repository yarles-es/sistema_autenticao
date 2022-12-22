const { userService, accountService } = require('../services');
const { createToken, verifyToken } = require('../auth/jwtFunctions');

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
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const user = await userService.getById(Number(id));
  const dataToken = verifyToken(authorization);
  if(user.email === dataToken.data) {
    await userService.deleteUser(user.email);
    return res.status(200).json({
      message: `usuario ${user.firstName} ${user.lastName} deletado com sucesso.`,
    });
  }
  return res.status(500).json({ message: "erro interno" });
};

module.exports = {
  createUser,
  deleteUser,
};