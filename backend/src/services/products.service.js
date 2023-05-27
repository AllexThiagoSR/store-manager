const { productsModel } = require('../models');
const { validateProduct } = require('./validations');

const getAll = async () => {
  try {
    const result = await productsModel.getAll();
    return { type: null, message: result };
  } catch (error) {
    return { type: 500, message: 'Internal server error' };
  }
};

const getById = async (id) => {
  try {
    const result = await productsModel.getById(id);
    if (!result) return { type: 404, message: 'Product not found' };
    return { type: null, message: result };
  } catch (error) {
    return { type: 500, message: 'Internal server error' };
  }
};

const create = async ({ name }) => {
  try {
    const { type, message } = validateProduct({ name });
    if (type) return { type, message };
    const id = await productsModel.create({ name });
    return { type: null, message: { id, name } };
  } catch (error) {
    return { type: 500, message: 'Internal server error' };
  }
};

module.exports = { getAll, getById, create };
