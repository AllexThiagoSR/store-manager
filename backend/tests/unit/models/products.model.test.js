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

  it('getById id existente', async function () {
    sinon.stub(connection, 'execute').resolves([[allProducts[1]]]);
    expect(await productsModel.getById(2)).to.be.deep.equal(allProducts[1]);
  });
  
  it('getById id inexistente', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    expect(await productsModel.getById(2)).to.be.deep.equal(undefined);
  });

  it('create', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
    expect(await productsModel.create({ name: 'Produto X' })).to.be.equal(42);
  });

  it('update', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    expect(await productsModel.update({ id: 1, newName: 'Product Y' })).to.be.equal(1);
  });

  it('delete', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    expect(await productsModel.deleteProduct(1)).to.be.equal(1);
  });
});
