const { productsModel } = require('../models');

const getAll = async () => {
  try {
    const result = await productsModel.getAll();
    return { type: null, message: result };
  } catch (error) {
    return { type: 500, message: 'Internal server error' };
  }
};

module.exports = { getAll };
