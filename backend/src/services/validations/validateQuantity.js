const { updateSaleItem } = require('./schema');

const validateQuantity = (body) => {
  const { error } = updateSaleItem.validate(body);
  if (error) return { type: 422, message: error.message };
  return { type: null, message: '' };
};

module.exports = validateQuantity;
