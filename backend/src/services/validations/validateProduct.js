const { createProductSchema } = require('./schema');

const validateProduct = (product) => {
  const { error } = createProductSchema.validate(product);
  if (error) return { type: 422, message: error.message };
  return { type: null, message: '' };
};

module.exports = validateProduct;
