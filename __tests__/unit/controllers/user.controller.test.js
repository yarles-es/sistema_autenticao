const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const { userService, accountService } = require('../../../src/services');
const { userController } = require('../../../src/controllers');

describe('verificação completa do userController', () => {
  afterEach(sinon.restore);

  it('testando a criação de um usuario', async () => {
    const id = 1;
    const data = {
      firstName: 'Yarles',
      lastName: 'Andrade',
      email: 'yarles100@gmail.com.br',
      cpf: '61650110049',
      birthDate: '1996/06/24',
      motherName: 'Lusinete de Andrade',
    };
    const fakeUser = { id, ...data };

    const fakeAccount = {
      id: 1,
      idUser: 1,
      email: 'yarles1000@gmail.com',
      password: '$2b$10$MWu7uDlcmsKair1ateVo3OJpcR/g3SfCd6e68Okl3HJ0dc5rYQbn6'
    }

    const res = {};
    const req = {
      body: data,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(userService, 'createUser').resolves(fakeUser);
    sinon.stub(accountService, 'createAccount').resolves(fakeAccount);
    await userController.createUser(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledOnceWith();
  });

}); 