const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/', controller.render);
router.get('/getAllMonAn', controller.getAllMonAn);
router.use('/', express.json());
router.post('/updateMonAn', controller.updateMonAn);
router.post('/insertHoaDon', controller.thanhtoan);


module.exports = router;