const { salesService } = require('../services');

const getAll = async (_req, res) => {
  const { type, message } = await salesService.getAll();
  const status = type || 200;
  const result = typeof message === 'string' ? { message } : message;
  return res.status(status).json(result);
};

module.exports = { getAll };
