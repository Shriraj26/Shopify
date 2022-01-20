const express = require('express');

const validateDto = require('../middlewares/validate-dto');
const createSchema = require('../validators/create');
const updateSchema = require('../validators/update');

const indexController = require('../controllers/inventory');

const router = express.Router();

router.get('/fetch', indexController.getItemById);

router.post('/create', validateDto(createSchema), indexController.createItem);

router.put('/update', validateDto(updateSchema), indexController.updateItem);

router.delete('/delete', indexController.deleteItem);

router.post('/undo', indexController.undoDelete);

router.get('/getall', indexController.getAllItems);

module.exports = router;