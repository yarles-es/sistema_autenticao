const Joi = require('joi').extend(require('@joi/date'));
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);

const validateUser = async (req, res, next) => {
  const object = req.body;

  const checkUser = Joi.object({
    cpf: Joi.string().max(11).min(11).required(),
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    birthDate: Joi.date().format('YYYY-MM-DD').utc().required(),
    motherName: Joi.string().min(6).required(),
    password: joiPassword
    .string()
    .min(8)
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .required(),
  });

  const { error } = checkUser.validate(object);

  if(error === undefined) return next();

  return res.status(400).json({ message: error.details[0].message });
}

validateCpf = async (req, res, next) => {
  const { User } = require('../models');
  const { cpf } = req.body

    const findCpf = await User.findOne({ where: { cpf } })
  
    if (cpf === findCpf.cpf) {
      return res.status(400).json({ message: "cpf já existente" })
    }

  next();
}

module.exports = {
  validateUser,
  validateCpf,
}