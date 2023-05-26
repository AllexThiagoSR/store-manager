const chai = require('chai');
const { describe, it } = require('mocha');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { allProducts } = require('./mocks/porducts.controller.mocks');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

chai.use(sinonChai);
const { expect } = chai;
describe('Testes products na camada controller', function () {
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
});