const { User } = require("../models");

const validateUserExists = async (req, res, next) => {
  const { email, cpf } = req.body;
  const userEmail = await User.findOne({ where: { email } });
  const userCpf = await User.findOne({ where: { cpf } });
  if (userEmail)
    return res.status(400).json({
      message: `Já possui uma conta cadastrada com o email: ${email}`,
    });

  if (userCpf)
    return res.status(400).json({
      message: `Já possui uma conta cadastrada com o cpf: ${cpf}`,
    });
  return next();
};

module.exports = {
  validateUserExists,
};
