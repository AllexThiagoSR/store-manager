const { productsService } = require('../services');

const getAll = async (_req, res) => {
  const { type, message } = await productsService.getAll();
  const status = type || 200;
  const result = typeof message === 'string' ? { message } : message;
  return res.status(status).json(result);
};

const getById = async ({ params }, res) => {
  const { type, message } = await productsService.getById(params.id);
  const status = type || 200;
  const result = typeof message === 'string' ? { message } : message;
  return res.status(status).json(result); 
};

const create = async (req, res) => {
  console.log(req.body);
  const { type, message } = await productsService.create(req.body);
  const status = type || 201;
  const result = typeof message === 'string' ? { message } : message;
  return res.status(status).json(result);
};

module.exports = { getAll, getById, create };
