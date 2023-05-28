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

  it('getById captura o erro e lança uma mensagem genérica', async function () {
    sinon.stub(productsModel, 'getById').rejects();
    expect(await productsService.getById())
      .to.be.deep.equal({ type: 500, message: 'Internal server error' });
  });

  it('create', async function () {
    sinon.stub(productsModel, 'create').resolves(42);
    expect(await productsService.create({ name: 'Produto X' }))
      .to.be.deep.equal({ 
        type: null,
        message: {
          id: 42,
          name: 'Produto X',
        },
    });
  });
  
  it('create captura o erro e lança uma mensagem genérica', async function () {
    sinon.stub(productsModel, 'create').rejects();
    expect(await productsService.create({}))
      .to.be.deep.equal({ type: 500, message: 'Internal server error' });
  });

  it('create com um name com menos de 5 caracteres lança uma mensagem de erro', async function () {
    expect(await productsService.create({ name: 'Pro' }))
      .to.be.deep.equal({ 
        type: 422,
        message: '"name" length must be at least 5 characters long',
    });
  });

  it('update', async function () {
    sinon.stub(productsModel, 'update').resolves(1);
    sinon.stub(productsModel, 'getById').resolves({ id: 1, name: 'Produto X' });
    expect(await productsService.update({ id: 1, newName: 'Produto Y' }))
      .to.be.deep.equal({ type: null, message: { id: 1, name: 'Produto Y' } });
  });

  it('update com id inexistente', async function () {
    sinon.stub(productsModel, 'update').resolves(0);
    sinon.stub(productsModel, 'getById').resolves(undefined);
    expect(await productsService.update({ id: 1000, newName: 'Produto Y' }))
      .to.be.deep.equal({ type: 404, message: 'Product not found' });
  });

  it('update com um nome inválido', async function () {
    expect(await productsService.update({ id: 1, newName: 'Pro' }))
      .to.be.deep.equal({ type: 422, message: '"name" length must be at least 5 characters long' });
  });

  it('deleteProduct', async function () {
    sinon.stub(productsModel, 'deleteProduct').resolves(1);
    sinon.stub(productsModel, 'getById').resolves({ id: 1, name: 'Produto X' });
    expect(await productsService.deleteProduct(1))
      .to.be.deep.equal({ type: null, message: '' });
  });

  it('deletProduct com id inexistente', async function () {
    sinon.stub(productsModel, 'deleteProduct').resolves(0);
    sinon.stub(productsModel, 'getById').resolves(undefined);
    expect(await productsService.deleteProduct(1000))
      .to.be.deep.equal({ type: 404, message: 'Product not found' });
  });
});