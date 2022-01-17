const express = require('express');

const indexController = require('../controllers/index');

const router = express.Router();

router.get('/', indexController.home);

router.post('/create', indexController.create);

router.get('/get', indexController.get);

router.get('/read', indexController.read);

router.put('/update', indexController.update);

router.delete('/delete', indexController.delete);

router.post('/undo', indexController.undoDelete);

module.exports = router;