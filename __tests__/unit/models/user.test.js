const chai = require('chai');
chai.use(require('sinon-chai'));
const { expect } = chai;

const {
sequelize,
dataTypes,
checkModelName,
checkPropertyExists,
} = require('sequelize-test-helpers');

const userModel = require('../../../src/models/User');

describe('teste de estrutura completa model de User', () => {
  const User = userModel(sequelize, dataTypes);
  const user = new User();

  context('Verifica se o model possui o nome "User"', () => {
    checkModelName(User)('User');
  })

  context('Verifica se a model "User" possui as propriedades corretas', () => {
    const properties = ['id', 'firstName', 'lastName', 'email', 'cpf', 'birthDate', 'motherName'];
    properties.forEach(checkPropertyExists(user));
  });

  context('Verifica se possui associação com a tabela "Accounts"', () => {
    const Account = 'Account';

    before(() => {
      User.associate({ Account });
    })

    it('Testa a associação', () => {
      expect(User.hasOne).to.have.been.calledWith(Account, { 
        foreignKey: 'idUser',
        as: 'Accounts',
      });
    });
  });

});