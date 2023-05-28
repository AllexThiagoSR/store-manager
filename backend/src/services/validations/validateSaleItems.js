const { createSaleSchema } = require('./schema');

const validateCreateSale = (items) => {
  const { error } = createSaleSchema.validate(items);
  if (error) {
    const errorCode = error.message === '"quantity" must be greater than or equal to 1'
      ? 422 : 400;
    return { type: errorCode, message: error.message };
  }
  return { type: null, message: '' };
};

module.exports = validateCreateSale;
