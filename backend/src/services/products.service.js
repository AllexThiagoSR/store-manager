const { productsModel } = require('../models');

const getAll = async () => {
  try {
    const result = await productsModel.getAll();
    return { type: null, message: result };
  } catch (error) {
    return { type: 500, message: 'Internal server error' };
  }
};

const getById = async (id) => {
  const result = await productsModel.getById(id);
  if (!result) return { type: 404, message: 'Product not found' };
  return { type: null, message: result };
};

module.exports = { getAll, getById };
