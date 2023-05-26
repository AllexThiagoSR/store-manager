const { Router } = require('express');
const { productsController } = require('../controllers');

const router = Router();

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);

module.exports = router;
