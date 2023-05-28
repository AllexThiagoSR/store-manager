const chai = require('chai');
const { describe, it, afterEach } = require('mocha');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { allProducts, oneProduct } = require('./mocks/porducts.controller.mocks');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { validateProductCreate } = require('../../../src/middlewares/products.middlewares');

const INTERNAL_SERVER_ERROR = 'Internal server error';
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
    sinon.stub(productsService, 'getAll').resolves({ type: 500, message: INTERNAL_SERVER_ERROR });
    await productsController.getAll(req, res);
    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: INTERNAL_SERVER_ERROR });
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
      .resolves({ type: 500, message: INTERNAL_SERVER_ERROR });
    await productsController.getById(req, res);
    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: INTERNAL_SERVER_ERROR });
  });

  it('create', async function () {
    const req = { body: { name: 'Produto X' } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();
    sinon.stub(productsService, 'create')
      .resolves({ type: null, message: { id: 42, name: 'Produto X' } });
    await productsController.create(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 42, name: 'Produto X' });
  });

  it('create quando há um erro não mapeado na camada service', async function () {
    const req = { body: { name: 'Produto X' } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();
    sinon.stub(productsService, 'create').resolves({ type: 500, message: INTERNAL_SERVER_ERROR });
    await productsController.create(req, res);
    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: INTERNAL_SERVER_ERROR });
  });

  it('create com um nome inválido', async function () {
    const req = { body: { name: 'Pro' } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();
    await productsController.create(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json)
      .to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });

  it('middlware de validação sem a propriedade name', async function () {
    const req = { body: {} };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();
    await validateProductCreate(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json)
      .to.have.been.calledWith({ message: '"name" is required' });
  });

  it('middlware de validação com propriedade name', async function () {
    const req = { body: { name: 'asds' } };
    const res = {};
    const next = sinon.stub().returns();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();
    await validateProductCreate(req, res, next);
    expect(next).to.have.been.calledWith();
  });

  it('update', async function () {
    const req = { body: { name: 'Produto Y' }, params: { id: 1 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();
    await productsController.update(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json)
      .to.have.been.calledWith({ id: 1, name: 'Produto Y' });
  });

  it('update com id inválido', async function () {
    const req = { body: { name: 'Produto Y' }, params: { id: 10000 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();
    await productsController.update(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json)
      .to.have.been.calledWith({ message: 'Product not found' });
  });

  it('update com nome inválido', async function () {
    const req = { body: { name: 'Pro' }, params: { id: 10000 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();
    await productsController.update(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json)
      .to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });
});