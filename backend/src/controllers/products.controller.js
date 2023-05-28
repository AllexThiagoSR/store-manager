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
  const { type, message } = await productsService.create(req.body);
  const status = type || 201;
  const result = typeof message === 'string' ? { message } : message;
  return res.status(status).json(result);
};

const update = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const { type, message } = await productsService.update({ id, newName: name });
  const status = type || 200;
  const result = typeof message === 'string' ? { message } : message;
  return res.status(status).json(result);
};

const deleteProduct = async ({ params }, res) => {
  const { id } = params;
  const { type, message } = await productsService.deleteProduct(id);
  const status = type || 204;
  if (message === '') return res.status(status).end();
  return res.status(status).json({ message });
};

module.exports = { getAll, getById, create, update, deleteProduct };
