const validateProductCreate = async (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  return next();
};

const quantitiesIsDefined = async ({ body }, res, next) => {
  const { quantity } = body;
  if (!quantity) return res.status(400).json({ message: '"quantity" is required' });
  return next();
};

module.exports = { validateProductCreate, quantitiesIsDefined };