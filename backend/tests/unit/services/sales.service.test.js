const { expect } = require('chai');
const { describe, it } = require('mocha');
const sinon = require('sinon');
const { sales } = require('./mocks/sales.service.mocks');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');

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
});
