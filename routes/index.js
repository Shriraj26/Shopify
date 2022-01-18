const express = require('express');

const validateDto = require('../middlewares/validate-dto');
const createSchema = require('../validators/create');
const updateSchema = require('../validators/update');

const indexController = require('../controllers/index');

const router = express.Router();

router.get('/', indexController.home);

router.post('/create', validateDto(createSchema), indexController.create);

router.put('/update/:id', validateDto(updateSchema), indexController.update);

router.get('/get/:id', indexController.get);

router.get('/read', indexController.read);

router.delete('/delete/:id', indexController.delete);

router.post('/undo', indexController.undoDelete);

module.exports = router;