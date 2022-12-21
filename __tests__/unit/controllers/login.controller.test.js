const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const { accountService } = require('../../../src/services');
const { loginController } = require('../../../src/controllers');

const { createToken } = require('../../../src/auth/jwtFunctions');

describe('verificação completa do accountController', () => {
  afterEach(sinon.restore);

  it('testando a solicitação de login valida', async () => {
    const res = {};
    const req = {
      body: {
        email: 'yarles1000@gmail.com.br',
        password: 'Yarles123456789@',
      }
    };

    const fakeToken = createToken(req.body.email);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(accountService, 'login').resolves(true);

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(200);
    console.log(res.json)
    expect(res.json).to.have.been.calledWith({ token: fakeToken });

  });

  it('testando a solicitação de login invalida', async () => {
    const res = {};
    const req = {
      body: {
        email: 'yarles1000@gmail.com.br',
        password: 'Yarles123456789@',
      }
    };

    const fakeToken = createToken(req.body.email);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(accountService, 'login').resolves(true);

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ token: fakeToken });

  });
});
