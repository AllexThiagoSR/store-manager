const { Router } = require('express');
const { productsController } = require('../controllers');

const router = Router();

router.get('/', productsController.getAll);

module.exports = router;