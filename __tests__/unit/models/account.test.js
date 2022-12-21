const chai = require('chai');
chai.use(require('sinon-chai'));
const { expect } = chai;

const {
sequelize,
dataTypes,
checkModelName,
checkPropertyExists,
} = require('sequelize-test-helpers');

const accountModel = require('../../../src/models/Account');

describe('teste de estrutura completa model de Account', () => {
  const Account = accountModel(sequelize, dataTypes);
  const account = new Account();

  context('Verifica se o model possui o nome "Account"', () => {
    checkModelName(Account)('Account');
  });

  context('Verifica se a model "Account" possui as propriedades corretas', () => {
    const properties = ['id', 'email', 'password', 'idUser'];
    properties.forEach(checkPropertyExists(account));
  });

  context('Verifica se possui associação com a tabela "User"', () => {
    const User = 'User';

    before(() => {
      Account.associate({ User });
    })

    it('Testa a associação', () => {
      expect(Account.belongsTo).to.have.calledWith(User, {
        foreignKey: 'idUser',
        as: 'Users',
      })
    });
  });
});