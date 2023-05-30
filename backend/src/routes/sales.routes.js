const { Router } = require('express');
const { salesController } = require('../controllers');
const { quantityIsDefined } = require('../middlewares/products.middlewares');

const router = Router();

router.get('/', salesController.getAll);

router.get('/:id', salesController.getById);

router.post('/', salesController.create);

router.delete('/:id', salesController.deleteSale);

router.put(
  '/:saleId/products/:productId/quantity',
  quantityIsDefined,
  salesController.updateQuantity,
);

module.exports = router;
