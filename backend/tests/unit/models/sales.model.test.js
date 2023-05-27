const { expect } = require('chai');
const { describe, it } = require('mocha');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { sales } = require('./mocks/sales.model.mocks');
const { salesModel } = require('../../../src/models');

describe('Testes de sales na camada model', function () {
  afterEach(sinon.restore);

  it('getAll', async function () {
    sinon.stub(connection, 'execute').resolves([sales]);
    expect(await salesModel.getAll()).to.be.deep.equal(sales);
  });

  it('getById id existente', async function () {
    sinon.stub(connection, 'execute').resolves([[sales[0], sales[1]]]);
    expect(await salesModel.getById(1)).to.be.deep.equal([sales[0], sales[1]]);
  });

  it('getById id inexistente', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    expect(await salesModel.getById(1)).to.be.deep.equal([]);
  });

  it('create', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
    expect(await salesModel.create()).to.be.equal(42);
  });
});
