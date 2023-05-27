const { salesModel, productsModel } = require('../models');

const getAll = async () => {
  try {
    const result = await salesModel.getAll();
    return { type: null, message: result };
  } catch (e) {
    return { type: 500, message: 'Internal server error' };
  }
};

const getById = async (id) => {
  try {
    const result = await salesModel.getById(id);
    if (result.length === 0) return { type: 404, message: 'Sale not found' };
    return { type: null, message: result };
  } catch (e) {
    return { type: 500, message: 'Internal server error' };
  }
};

const createSale = async (items) => {
  try {
    const soldItems = items.map(({ productId }) => productsModel.getById(productId));
    if ((await Promise.all(soldItems)).includes(undefined)) {
      return { type: 404, message: 'Product not found' };
    }
    const saleId = await salesModel.create();
    items.forEach(async ({ productId, quantity }) => {
      await salesModel.insertSoldItem({ saleId, productId, quantity });
    });
    return { type: null, message: { id: saleId, itemsSold: items } };
  } catch (e) {
    return { type: 500, message: 'Internal server error' };
  }
};

module.exports = { getAll, getById, createSale };
