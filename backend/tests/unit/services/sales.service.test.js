const { expect } = require('chai');
const { describe, it } = require('mocha');
const sinon = require('sinon');
const { sales, insertedSale } = require('./mocks/sales.service.mocks');
const { salesService } = require('../../../src/services');
const { salesModel, productsModel } = require('../../../src/models');

describe('Testes de sales na camada model', function () {
  afterEach(sinon.restore);

  it('getAll funciona normalmente', async function () {
    sinon.stub(salesModel, 'getAll').resolves(sales);
    expect(await salesService.getAll()).to.be.deep.equal({ type: null, message: sales });
  });

  it('getAll captura o erro e lança uma mensagem genérica', async function () {
    sinon.stub(salesModel, 'getAll').rejects();
    expect(await salesService.getAll())
      .to.be.deep.equal({ type: 500, message: 'Internal server error' });
  });

  it('getById com id existente', async function () {
    sinon.stub(salesModel, 'getById').resolves([sales[0], sales[1]]);
    expect(await salesService.getById(1))
      .to.be.deep.equal({ type: null, message: [sales[0], sales[1]] });
  });

  it('getAll com id inexistente', async function () {
    sinon.stub(salesModel, 'getById').resolves([]);
    expect(await salesService.getById(99999))
      .to.be.deep.equal({ type: 404, message: 'Sale not found' });
  });

  it('getById captura o erro e lança uma mensagem genérica', async function () {
    sinon.stub(salesModel, 'getById').rejects();
    expect(await salesService.getById())
      .to.be.deep.equal({ type: 500, message: 'Internal server error' });
  });

  it('createSale', async function () {
    sinon.stub(salesModel, 'create').resolves(3);
    sinon.stub(salesModel, 'insertSoldItem').resolves(5);
    sinon.stub(productsModel, 'getById').resolves({});
    expect(await salesService.createSale([{ productId: 1, quantity: 1 }]))
      .to.be.deep.equal({ type: null, message: insertedSale });
  });

  it('createSale com um produto inexistente', async function () {
    sinon.stub(salesModel, 'create').resolves(3);
    sinon.stub(productsModel, 'getById').resolves(undefined);
    expect(await salesService.createSale([{ productId: 999, quantity: 1 }]))
      .to.be.deep.equal({ type: 404, message: 'Product not found' });
  });

  it('createSale com um erro não mapeado em alguma das camadas mais baixas', async function () {
    sinon.stub(salesModel, 'create').resolves(3);
    sinon.stub(productsModel, 'getById').rejects();
    expect(await salesService.createSale([{ productId: 999, quantity: 1 }]))
      .to.be.deep.equal({ type: 500, message: 'Internal server error' });
  });
});
