const { createSaleSchema } = require('./schema');

const validateCreateSale = (items) => {
  const { error } = createSaleSchema.validate(items);
  if (error) {
    const message = error.message.replace(/\[[0-9]\]\./g, '');
    const errorCode = message === '"quantity" must be greater than or equal to 1'
      ? 422 : 400;
    return { type: errorCode, message };
  }
  return { type: null, message: '' };
};

module.exports = validateCreateSale;
