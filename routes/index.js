const express = require('express');

const validateDto = require('../middlewares/validate-dto');
const createSchema = require('../validators/create');
const updateSchema = require('../validators/update');

const indexController = require('../controllers/index');

const router = express.Router();

router.get('/fetch', indexController.home);

router.post('/create', validateDto(createSchema), indexController.create);

router.put('/update', validateDto(updateSchema), indexController.update);

router.delete('/delete', indexController.delete);

router.post('/undo', indexController.undoDelete);

module.exports = router;