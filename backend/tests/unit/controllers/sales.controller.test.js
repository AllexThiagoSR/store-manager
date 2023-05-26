// const chai = require('chai');
// const { describe, it, afterEach } = require('mocha');
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// const { allProducts, oneProduct } = require('./mocks/porducts.controller.mocks');
// const { salesService } = require('../../../src/services');
// const { salesController } = require('../../../src/controllers');

// chai.use(sinonChai);
// const { expect } = chai;
// describe('Testes sales na camada controller', function () {
//   afterEach(sinon.restore);

//   it('getAll', async function () {
//     const req = {};
//     const res = {};
//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub();
//     sinon.stub(salesService, 'getAll').resolves(allProducts);
//     await salesController.getAll(req, res);
//     expect(res.status).to.have.been.calledWith(200);
//     expect(res.json).to.have.been.calledWith(allProducts.message);
//   });

//   it('getById com id existente', async function () {
//     const req = { params: { id: '1' } };
//     const res = {};
//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub();
//     sinon.stub(salesService, 'getById').resolves(oneProduct);
//     await salesController.getById(req, res);
//     expect(res.status).to.have.been.calledWith(200);
//     expect(res.json).to.have.been.calledWith(oneProduct.message);
//   });

//   it('getById com id inexistente', async function () {
//     const req = { params: { id: '999999' } };
//     const res = {};
//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub();
//     sinon.stub(salesService, 'getById').resolves({ type: 404, message: 'Sale not found' });
//     await salesController.getById(req, res);
//     expect(res.status).to.have.been.calledWith(404);
//     expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
//   });
// });