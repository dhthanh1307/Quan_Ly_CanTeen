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
router.post('/createKhachHang', controller.insertKhachHang);
router.post('/getKhachHang', controller.getKhachHang);
router.post('/updateKhachHang', controller.updateKhachHang);

router.post('/removeStaff', controller.removeStaff);
router.post('/thongke', controller.thongke);
router.get('/nhansu', controller.nhansu);
router.post('/insertStaff', controller.insertStaff);

module.exports = router;