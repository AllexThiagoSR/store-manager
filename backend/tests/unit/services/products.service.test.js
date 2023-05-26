const { expect } = require('chai');
const { describe, it } = require('mocha');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { allProducts } = require('./mocks/porducts.service.mocks');
const { productsService } = require('../../../src/services');

describe('Testes products na camada service', function () {
  afterEach(sinon.restore);

  it('getAll', async function () {
    sinon.stub(productsModel, 'getAll').resolves(allProducts);
    expect(await productsService.getAll()).to.be.deep.equal({ type: null, message: allProducts });
  });
  
  it('getAll captura o erro e lança uma mensagem genérica', async function () {
    sinon.stub(productsModel, 'getAll').rejects();
    expect(await productsService.getAll())
      .to.be.deep.equal({ type: 500, message: 'Internal server error' });
  });

  it('getById com um id existente', async function () {
    sinon.stub(productsModel, 'getById').resolves(allProducts[1]);
    expect(await productsService.getById(2))
      .to.be.deep.equal({ type: null, message: allProducts[1] });
  });

  it('getById com um id inexistente', async function () {
    sinon.stub(productsModel, 'getById').resolves(undefined);
    expect(await productsService.getById(9999))
      .to.be.deep.equal({ type: 404, message: 'Product not found' });
  });
});