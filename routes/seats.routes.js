const express = require('express');
const router = express.Router();
const SeatsController = require('../controllers/seats.controller');

router.get('/seats', SeatsController.getAll);
router.get('/seats/:id', SeatsController.getById);
router.post('/seats', SeatsController.addNew);
router.put('/seats/:id', SeatsController.update);
router.delete('/seats/:id', SeatsController.delete);

module.exports = router;