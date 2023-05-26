const { expect } = require('chai');
const { describe, it } = require('mocha');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { allProducts } = require('./mocks/porducts.service.mocks');
const { productsService } = require('../../../src/services');

describe('Testes products na camada service', function () {
  it('getAll', async function () {
    sinon.stub(productsModel, 'getAll').resolves(allProducts);
    expect(await productsService.getAll()).to.be.deep.equal({ type: null, message: allProducts });
  });
});