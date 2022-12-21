const { expect } = require('chai');
const { match, stub, resetHistory } = require('sinon');
const proxyquire = require('proxyquire');

const { makeMockModels } = require('sequelize-test-helpers');

describe('src/service/account.service', () => {
  const Account = { create: stub(), findOne: stub() };
  const mockModels = makeMockModels({ Account });

  const { createAccount, login } = proxyquire('../../../src/services/account.service.js',
  { '../models': mockModels });

    const id = 1;
    const data = {
      email: 'yarles1000@gmail.com.br',
      password: '$2b$10$bRUkgEMFIxA2BHDuRM.d5.k1yt25PlUxjcdSoa.J/UnjUpj94JWDe',
      idUser: 1,
    }

    const fakeAccount = {
      id,
      ...data,
      create: stub(),
      findOne: stub(),
    };

    let result;

    context('testando função que faz login com autenticação hash com uma conta valida', () => {
      before(async () => {
        Account.findOne.resolves(fakeAccount);
        result = await login(data.email,'Yarles123456789@');
      });
      after(resetHistory);

      it('Espera que a função Account.findOne foi chamada', () => {
        expect(Account.findOne).to.have.been.calledWith(match({ where: { email: data.email }}));
      })

      it('Espera que o resultado seja uma account valido com', () => {
        expect(result).to.be.equal(true);
      })

    });

    context('testando função que faz login com autenticação hash com uma conta invalida', () => {
      before(async () => {
        Account.findOne.resolves(fakeAccount);
        result = await login(data.email,'Yarles12345@');
      });
      after(resetHistory);

      it('Espera que a função Account.findOne foi chamada', () => {
        expect(Account.findOne).to.have.been.calledWith(match({ where: { email: data.email }}));
      })

      it('Espera que o resultado seja uma account invalido com', () => {
        expect(result).to.be.equal(false);
      })
    });

    context('testando função que faz a criação de uma account', () => {
      before(async () => {
        Account.create.resolves({idUser: id, email: data.email, password: data.password });
        result = await createAccount(id, { email: data.email, password: 'Yarles123456789@'});
      });
      after(resetHistory);

      it('espera que a função Account.create foi chamada', () => {
        expect(Account.create).to.have.been.calledOnceWith();
      });

      it('espera que o a funçao retorne uma conta criada', () => {
        expect(result).to.deep.equal({...data });
      });

    });
});