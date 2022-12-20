const { accountService } = require('../services');
const { createToken } = require('../auth/jwtFunctions');

const login = async (req, res) => {
const { email, password } = req.body;
const requestLogin = await accountService.login(email, password);

if(requestLogin) {
  const token = createToken(email);
  return res.status(200).json({ token });
}

return res.status(400).json({ message: 'Falha na autenticação' })
};

module.exports = {
  login,
}