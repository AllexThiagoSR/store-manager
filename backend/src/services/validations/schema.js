const Joi = require('joi');

const nameSchema = Joi.string().min(5);

const createProductSchema = Joi.object({
  name: nameSchema,
});

const saleItem = Joi.object({
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
});

const createSaleSchema = Joi.array().items(saleItem).min(1).required();

module.exports = {
  createProductSchema,
  createSaleSchema,
  nameSchema,
};
