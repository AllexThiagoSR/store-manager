const { expect } = require('chai');
const { describe, it } = require('mocha');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { sales } = require('./mocks/sales.model.mocks');
const { salesModel } = require('../../../src/models');

describe('Testes de sales na camada model', function () {
  afterEach(sinon.stub);

  it('getAll', async function () {
    sinon.stub(connection, 'execute').resolves([sales]);
    expect(await salesModel.getAll()).to.be.deep.equal(sales);
  });
});
