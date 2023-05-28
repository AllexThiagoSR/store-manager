const { Router } = require('express');
const { productsController } = require('../controllers');
const { validateProductCreate } = require('../middlewares/products.middlewares');

const router = Router();

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.post('/', validateProductCreate, productsController.create);
router.put('/:id', validateProductCreate, productsController.update);

module.exports = router;
