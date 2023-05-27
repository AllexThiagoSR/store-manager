const { Router } = require('express');
const { productsController } = require('../controllers');

const router = Router();

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.post('/', productsController.create);

module.exports = router;
