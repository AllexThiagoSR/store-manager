const { expect } = require('chai');
const { describe, it } = require('mocha');
const sinon = require('sinon');
const { sales, insertedSale } = require('./mocks/sales.service.mocks');
const { salesService } = require('../../../src/services');
const { salesModel, productsModel } = require('../../../src/models');

const INTERNAL_SERVER_ERROR = 'Internal server error';

describe('Testes de sales na camada model', function () {
  afterEach(sinon.restore);

  it('getAll funciona normalmente', async function () {
    sinon.stub(salesModel, 'getAll').resolves(sales);
    expect(await salesService.getAll()).to.be.deep.equal({ type: null, message: sales });
  });

  it('getAll captura o erro e lança uma mensagem genérica', async function () {
    sinon.stub(salesModel, 'getAll').rejects();
    expect(await salesService.getAll())
      .to.be.deep.equal({ type: 500, message: INTERNAL_SERVER_ERROR });
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
      .to.be.deep.equal({ type: 500, message: INTERNAL_SERVER_ERROR });
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
    expect(await salesService.createSale([{ productId: 1, quantity: 1 }]))
      .to.be.deep.equal({ type: 500, message: INTERNAL_SERVER_ERROR });
  });

  it('deleteSale', async function () {
    sinon.stub(salesModel, 'deleteSale').resolves(1);
    sinon.stub(salesModel, 'getById').resolves([{}]);
    expect(await salesService.deleteSale(1))
      .to.be.deep.equal({ type: null, message: '' });
  });

  it('deleteSale com um id inexistente', async function () {
    sinon.stub(salesModel, 'deleteSale').resolves(1);
    sinon.stub(salesModel, 'getById').resolves([]);
    expect(await salesService.deleteSale(1))
      .to.be.deep.equal({ type: 404, message: 'Sale not found' });
  });

  it('deleteSale com um erro não mapeado em alguma das camadas mais baixas', async function () {
    sinon.stub(salesModel, 'deleteSale').resolves(3);
    sinon.stub(salesModel, 'getById').rejects();
    expect(await salesService.deleteSale(1))
      .to.be.deep.equal({ type: 500, message: INTERNAL_SERVER_ERROR });
  });

  it('updateQuantity', async function () {
    sinon.stub(salesModel, 'getById').resolves([[sales[0]]]);
    sinon.stub(salesModel, 'updateQuantity').resolves([{ affectedRows: 1 }]);
    sinon.stub(salesModel, 'getProductsInSale').resolves(sales[0]);
    const product = await salesService.updateQuantity({ saleId: 1, productId: 1, quantity: 1 });
    expect(product).to.be.deep.equal({ type: null, message: sales[0] });
  });

  it('updateQuantity com saleId não existente', async function () {
    sinon.stub(salesModel, 'getById').resolves([[]]);
    sinon.stub(salesModel, 'updateQuantity').resolves([{ affectedRows: 1 }]);
    sinon.stub(salesModel, 'getProductsInSale').resolves(sales[0]);
    const product = await salesService.updateQuantity({ saleId: 100, productId: 1, quantity: 1 });
    expect(product).to.be.deep.equal({ type: null, message: sales[0] });
  });

  it('updateQuantity com productId não existente em uma sale', async function () {
    sinon.stub(salesModel, 'getById').resolves([[]]);
    sinon.stub(salesModel, 'updateQuantity').resolves([{ affectedRows: 1 }]);
    sinon.stub(salesModel, 'getProductsInSale').resolves(undefined);
    const product = await salesService.updateQuantity({ saleId: 1, productId: 100, quantity: 1 });
    expect(product).to.be.deep.equal({ type: 404, message: 'Product not found in sale' });
  });

  it('updateQuantity com quantity inválido', async function () {
    sinon.stub(salesModel, 'getById').resolves([[]]);
    sinon.stub(salesModel, 'updateQuantity').resolves([{ affectedRows: 1 }]);
    sinon.stub(salesModel, 'getProductsInSale').resolves(undefined);
    const product = await salesService.updateQuantity({ saleId: 1, productId: 100, quantity: 0 });
    expect(product).to.be.deep.equal({
      message: '"quantity" must be greater than or equal to 1',
      type: 422,
    });
  });

  it('updateQuantity com um erro não mapeado', async function () {
    sinon.stub(salesModel, 'getById').rejects();
    const product = await salesService.updateQuantity({ saleId: 1, productId: 100, quantity: 1 });
    expect(product).to.be.deep.equal({ type: 500, message: INTERNAL_SERVER_ERROR });
  });
});
