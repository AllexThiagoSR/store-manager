const { salesService } = require('../services');

const getAll = async (_req, res) => {
  const { type, message } = await salesService.getAll();
  const status = type || 200;
  const result = typeof message === 'string' ? { message } : message;
  return res.status(status).json(result);
};

const getById = async ({ params }, res) => {
  const { type, message } = await salesService.getById(params.id);
  const status = type || 200;
  const result = typeof message === 'string' ? { message } : message;
  return res.status(status).json(result);
};

const create = async ({ body }, res) => {
  const { type, message } = await salesService.createSale(body);
  const status = type || 201;
  const result = typeof message === 'string' ? { message } : message;
  return res.status(status).json(result);
};

const deleteSale = async ({ params }, res) => {
  const { type, message } = await salesService.deleteSale(params.id);
  if (type) return res.status(type).json({ message });
  return res.status(204).end();
};

module.exports = { getAll, getById, create, deleteSale };
