const { salesModel } = require('../models');

const getAll = async () => {
  try {
    const result = await salesModel.getAll();
    return { type: null, message: result };
  } catch (e) {
    return { type: 500, message: 'Internal server error' };
  }
};

module.exports = { getAll };
