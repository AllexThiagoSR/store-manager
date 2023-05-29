const { Router } = require('express');
const { salesController } = require('../controllers');

const router = Router();

router.get('/', salesController.getAll);

router.get('/:id', salesController.getById);

router.post('/', salesController.create);

router.delete('/:id', salesController.deleteSale);

module.exports = router;
