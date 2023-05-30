const { salesModel, productsModel } = require('../models');
const validateQuantity = require('./validations/validateQuantity');
const validateCreateSale = require('./validations/validateSaleItems');

const INTERNAL_SERVER_ERROR = 'Internal server error';

const getAll = async () => {
  try {
    const result = await salesModel.getAll();
    return { type: null, message: result };
  } catch (e) {
    return { type: 500, message: INTERNAL_SERVER_ERROR };
  }
};

const getById = async (id) => {
  try {
    const result = await salesModel.getById(id);
    if (result.length === 0) return { type: 404, message: 'Sale not found' };
    return { type: null, message: result };
  } catch (e) {
    return { type: 500, message: INTERNAL_SERVER_ERROR };
  }
};

const createSale = async (items) => {
  try {
    const err = validateCreateSale(items);
    if (err.type) return err;
    const soldItems = items.map(({ productId }) => productsModel.getById(productId));
    if ((await Promise.all(soldItems)).includes(undefined)) {
      return { type: 404, message: 'Product not found' };
    }
    const saleId = await salesModel.create();
    await Promise.all(items.map(async ({ productId, quantity }) => {
      await salesModel.insertSoldItem({ saleId, productId, quantity });
    }));
    return { type: null, message: { id: saleId, itemsSold: items } };
  } catch (e) {
    return { type: 500, message: INTERNAL_SERVER_ERROR };
  }
};

const deleteSale = async (id) => {
  try {
    const result = await salesModel.getById(id);
    if (result.length === 0) return { type: 404, message: 'Sale not found' };
    await salesModel.deleteSale(id);
    return { type: null, message: '' };
  } catch (e) {
    return { type: 500, message: INTERNAL_SERVER_ERROR };
  }
};

const updateQuantity = async (infos) => {
  try {
    const error = validateQuantity({ quantity: infos.quantity });
    if (error.type) return error;
    const sale = await salesModel.getById(infos.saleId);
    if (sale.length === 0) return { type: 404, message: 'Sale not found' };
    await salesModel.updateQuantity(infos);
    const product = await salesModel.getProductsInSale(infos);
    if (!product) return { type: 404, message: 'Product not found in sale' };
    return { type: null, message: product };
  } catch (e) {
    return { type: 500, message: INTERNAL_SERVER_ERROR };
  }
};

module.exports = { getAll, getById, createSale, deleteSale, updateQuantity };
