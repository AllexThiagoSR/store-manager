const { expect } = require('chai');
const { describe, it } = require('mocha');
const sinon = require('sinon');
const { sales } = require('./mocks/sales.service.mocks');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');

describe('Testes de sales na camada model', function () {
  afterEach(sinon.stub);

  it('getAll', async function () {
    sinon.stub(salesModel, 'getAll').resolves(sales);
    expect(await salesService.getAll()).to.be.deep.equal({ type: null, message: sales });
  });
});
