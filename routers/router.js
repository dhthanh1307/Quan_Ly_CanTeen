const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/', controller.render);
router.get('/getAllMonAn', controller.getAllMonAn);
router.get('/getAllThucPham', controller.getAllThucPham);
router.use('/', express.json());
router.post('/login', controller.findUser);
router.post('/updateMonAn', controller.updateMonAn);
router.post('/insertHoaDon', controller.thanhtoan);
router.post('/insertThucPham', controller.insertThucPham);
router.post('/removeThucPham', controller.removeThucPham);
router.post('/searchThucPham', controller.searchThucPham);
router.post('/setPortion', controller.setPortion);
router.post('/checkPortionSet', controller.checkPortionSet);

router.post('/removeStaff', controller.removeStaff);
router.post('/thongke', controller.thongke);
router.get('/nhansu', controller.nhansu);
router.get('/giolam', controller.getGiolam);
router.post('/insertStaff', controller.insertStaff);
router.post('/insertGioLam', controller.insertGioLam);

module.exports = router;