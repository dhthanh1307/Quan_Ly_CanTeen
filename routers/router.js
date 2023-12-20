const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/', controller.render);
router.get('/getAllMonAn', controller.getAllFood);
router.get('/getAllMonAnToSell', controller.getAllFoodToSell);
router.get('/getAllThucPham', controller.getAllGoods);
router.use('/', express.json());
router.post('/login', controller.kiemtraTaiKhoan);
router.post('/updateMonAn', controller.capnhatMonAn);
router.post('/insertHoaDon', controller.thanhtoanHoaDon);
router.post('/insertThucPham', controller.nhapThucPham);
router.post('/removeThucPham', controller.xuatThucPham);
router.post('/searchThucPham', controller.timkiemThucPham);
router.post('/themMonAn', controller.themMonAn);
router.post('/themThucPham', controller.themThucPham);
router.post('/setPortion', controller.nhapChiTieu);
router.post('/checkPortionSet', controller.kiemtraChiTieu);
router.post('/createKhachHang', controller.themKhachHang);
router.post('/getKhachHang', controller.getCustomer);
router.post('/updateKhachHang', controller.capNhatKhachHang);

router.post('/removeStaff', controller.xoaNhanSu);
router.post('/thongke', controller.thongKeDoanhThu);
router.get('/nhansu', controller.getStaff);
router.post('/giolam', controller.getWork);
router.post('/insertStaff', controller.themNhanSu);
router.post('/insertGioLam', controller.nhapGioLam);

module.exports = router;