const { expect } = require('chai');
const { describe, it } = require('mocha');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { allProducts } = require('./mocks/porducts.model.mocks');

describe('Testes products na camada model', function () {
  afterEach(sinon.restore);
  
  it('getAll', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);
    expect(await productsModel.getAll()).to.be.deep.equal(allProducts);
  });

  it('getById', async function () {
    sinon.stub(connection, 'execute').resolves([[allProducts[1]]]);
    expect(await productsModel.getById(2)).to.be.deep.equal(allProducts[1]);
  });
});
