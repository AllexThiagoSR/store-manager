const chai = require('chai');
const { describe, it, afterEach } = require('mocha');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { allProducts, oneProduct } = require('./mocks/porducts.controller.mocks');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

chai.use(sinonChai);
const { expect } = chai;
describe('Testes products na camada controller', function () {
  afterEach(sinon.restore);

  it('getAll', async function () {
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();
    sinon.stub(productsService, 'getAll').resolves(allProducts);
    await productsController.getAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts.message);
  });

  it('getAll quando há um erro não mapeado na camada service', async function () {
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();
    sinon.stub(productsService, 'getAll').resolves({ type: 500, message: 'Internal server error' });
    await productsController.getAll(req, res);
    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: 'Internal server error' });
  });

  it('getById com id existente', async function () {
    const req = { params: { id: '1' } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();
    sinon.stub(productsService, 'getById').resolves(oneProduct);
    await productsController.getById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(oneProduct.message);
  });

  it('getById com id inexistente', async function () {
    const req = { params: { id: '999999' } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();
    sinon.stub(productsService, 'getById').resolves({ type: 404, message: 'Product not found' });
    await productsController.getById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('getById quando há um erro não mapeado na camada service', async function () {
    const req = { params: {} };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();
    sinon.stub(productsService, 'getById')
      .resolves({ type: 500, message: 'Internal server error' });
    await productsController.getById(req, res);
    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: 'Internal server error' });
  });
});