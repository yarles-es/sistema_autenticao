const { User } = require('../models');

const createUser = async (userInfo) => {
  const { firstName, lastName, email, cpf, birthDate, motherName } = userInfo;
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    cpf,
    birthDate,
    motherName,
  });

  return newUser;
}

const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email }});

  return user;
}

const getById = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

const deleteUser = async (email) => {
  const user = await User.destroy({ where: { email }});
}

module.exports = {
  createUser,
  getByEmail,
  getById,
  deleteUser,
};
