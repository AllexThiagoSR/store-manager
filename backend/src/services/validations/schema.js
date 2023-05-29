const Joi = require('joi');

const nameSchema = Joi.string().min(5);

const createProductSchema = Joi.object({
  name: nameSchema,
});

const quantitySchema = Joi.number().integer().min(1).required();

const saleItem = Joi.object({
  productId: Joi.number().integer().required(),
  quantity: quantitySchema,
});

const updateSaleItem = Joi.object({
  quantity: quantitySchema,
});

const createSaleSchema = Joi.array().items(saleItem).min(1).required();

module.exports = {
  createProductSchema,
  createSaleSchema,
  nameSchema,
  updateSaleItem,
};
