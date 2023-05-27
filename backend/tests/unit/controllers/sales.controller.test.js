const chai = require('chai');
const { describe, it, afterEach } = require('mocha');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { sales, oneSale } = require('./mocks/sales.controller.mocks');

chai.use(sinonChai);
const { expect } = chai;
describe('Testes sales na camada controller', function () {
  afterEach(sinon.restore);

  it('getAll', async function () {
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();
    sinon.stub(salesService, 'getAll').resolves(sales);
    await salesController.getAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(sales.message);
  });

  it('getAll quando há um erro não mapeado na camada service', async function () {
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();
    sinon.stub(salesService, 'getAll').resolves({ type: 500, message: 'Internal server error' });
    await salesController.getAll(req, res);
    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: 'Internal server error' });
  });

  it('getById com id existente', async function () {
    const req = { params: { id: '1' } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();
    sinon.stub(salesService, 'getById').resolves(oneSale);
    await salesController.getById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(oneSale.message);
  });

  it('getById com id inexistente', async function () {
    const req = { params: { id: '999999' } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();
    sinon.stub(salesService, 'getById').resolves({ type: 404, message: 'Sale not found' });
    await salesController.getById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });
});