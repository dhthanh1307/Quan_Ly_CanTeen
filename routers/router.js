const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/', controller.render);
router.get('/getAllMonAn', controller.getAllMonAn);
router.get('/getAllThucPham', controller.getAllThucPham);
router.use('/', express.json());
router.post('/login', controller.findUser);
router.post('/updateMonAn', controller.updateMonAn);
router.post('/insertThucPham', controller.insertThucPham);
router.post('/removeThucPham', controller.removeThucPham);

module.exports = router;