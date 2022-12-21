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

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;

  const user = await userService.getById(id);

  const validateToken = verifyToken(authorization);

  console.log(user);
  if (user.email === validateToken.data) {
    await userService.deleteUser(user.id)
    return res.status(200).json({ message: "Usuario excluido com sucesso!" });
  }
  return res.status(400).json({ message: "Não foi possível excluir usuario" })
}

module.exports = {
  createUser,
  deleteUser,
};