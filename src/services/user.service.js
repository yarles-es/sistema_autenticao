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



module.exports = {
  createUser,
  getByEmail,
};