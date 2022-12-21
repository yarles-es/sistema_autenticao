const { expect } = require('chai');
const { match, stub, resetHistory } = require('sinon');
const proxyquire = require('proxyquire');

const { makeMockModels } = require('sequelize-test-helpers');

describe ('src/service/user.service', () => {
  const User = { create: stub(), findOne: stub() };
  const mockModels = makeMockModels({ User });

  const { createUser, getByEmail } = proxyquire('../../../src/services/user.service.js',
  { '../models': mockModels });

  const id = 1;
  const data = {
    firstName: 'Yarles',
    lastName: 'Andrade',
    email: 'yarles100@gmail.com.br',
    cpf: '61650110049',
    birthDate: '1996/06/24',
    motherName: 'Lusinete de Andrade',
  };

  const fakeUser = { id, ...data, create: stub(), findOne: stub() };

  let result;

  context('testando função de buscar usuario pelo email existente', () => {
    before(async () => {
      User.findOne.resolves(fakeUser);
      result = await getByEmail(data.email);
    });
    after(resetHistory);

    it('Espera que a função User.findOne tenha sido chamada', () => {
      expect(User.findOne).to.have.been.calledWith(match({ where: { email: data.email }}))
    });

    it('Espera que o resultado seja um usuario valido', () => {
      expect(result).to.deep.equal(fakeUser);
    });
  });

  context('testando função de busca de usuario por email não existente', () => {
    before(async () => {
      User.findOne.resolves(undefined);
      result = await getByEmail(data.email);
    });
    after(resetHistory);

    it('Espera que a função User.findOne tenha sido chamada', () => {
      expect(User.findOne).to.have.been.calledWith(match({ where: { email: data.email }}))
    });

    it('Espera que o resultado da função findOne seja undefined', () => {
      expect(result).to.be.equal(undefined);
    });
  });

  context('testando função de criar um usuario', () => {
    before(async () => {
      fakeUser.create.resolves(fakeUser);
      User.create.resolves(fakeUser);
      result = await createUser(data);
    })
    after(resetHistory);

    it('espera que a função User.create tenha sido chamada', () => {
      expect(User.create).to.have.been.calledWith(match(data));
    });

    it('Espera que o resultado tenha o formato valido de um usuario', () => {
      expect(result).to.deep.equal(fakeUser);
    });
  });
});