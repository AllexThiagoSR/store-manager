const Joi = require('joi');

const nameSchema = Joi.string().min(5);

const createProductSchema = Joi.object({
  name: nameSchema,
});

module.exports = {
  createProductSchema,
};
