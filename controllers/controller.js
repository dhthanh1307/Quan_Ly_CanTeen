const NhanSu = require('../models/NhanSu');
const MonAn = require('../models/MonAn');
const ThucPham = require('../models/ThucPham');
const ChiTieu = require('../models/ChiTieu');
const DoanhThu = require('../models/DoanhThu');
const KhachHang = require('../models/KhachHang');
const HoaDon = require('../models/HoaDon');
const LamViec = require('../models/LamViec');
const BanHang = require('../models/BanHang');
const NhapHang = require('../models/NhapHang');


module.exports = {
    render: async (req, res, next) => {
        try {
            res.render('_index');
        }
        catch (err) {
            next(err);
        }
    },
    kiemtraTaiKhoan: async (req, res, next) => {
        try {
            console.log('find user');
            const body = req.body;
            const result = await NhanSu.timkiemTaiKhoan(body.username, body.password, body.isAdmin);
            res.json({ result: result });
        }
        catch (err) {
            next(err);
        }
    },
    getAllFood: async (req, res, next) => {
        try {
            console.log('all mon an');
            const data = await MonAn.getAllMonAn();
            res.json(data);
        }
        catch (err) {
            next(err);
        }
    },
    getAllFoodToSell: async (req, res, next) => {
        try {
            console.log('all mon an ban');
            const data = await MonAn.getAllMonAnBan();
            res.json(data);
        }
        catch (err) {
            next(err);
        }
    },
    capnhatMonAn: async (req, res, next) => {
        try {
            console.log('update mon an');
            const body = req.body;
            const result = await MonAn.capNhapMonAn(body.MaMonAn, body.TenMonAn, body.GiaBan, body.newCongThuc);
            res.json({});
        }
        catch (err) {
            next(err);
        }
    },

    thanhtoanHoaDon: async (req, res, next) => {
        try {
            console.log('check so luong');
            var ktra = false;
            const body = req.body;
            const chitieu = await ChiTieu.kiemTraSoLuongChiTieu(body.ListEdit);
            const thucpham = await ThucPham.kiemtraThucPham(body.ListEdit);
            console.log('thucpham: ', thucpham);
            console.log('chitieu: ', chitieu);

            if (chitieu && thucpham) {
                ktra = true;
                console.log('thanhtoan');
                const mabanhang = await HoaDon.nhapHoaDon(body.PhuongThuc, Math.round(body.SoTien));
                for (let i = 0; i < body.ListEdit.length; i++)
                    if (body.ListEdit[i].SoLuong > 0)
                        await BanHang.nhapBanHang(mabanhang, body.ListEdit[i], body.GiamGia);
                ChiTieu.capNhatChiTieu(body.ListEdit);
                ThucPham.capNhatThucPham(body.ListEdit);
            }
            res.json({ ktra });

        }
        catch (e) {
            next(e);
        }
    },
    getAllGoods: async (req, res, next) => {
        try {
            console.log('all thuc pham');
            const data = await ThucPham.getThucPham();
            res.json(data);
        }
        catch (err) {
            next(err);
        }
    },
    nhapThucPham: async (req, res, next) => {
        try {
            console.log('insert thuc pham');
            const body = req.body;
            const result = await NhapHang.nhapThucPham(body.MaThucPham, body.SoLuongNhap, body.NgayNhap, body.GiaNhap);
            res.json({});
        }
        catch (err) {
            next(err);
        }
    },
    xuatThucPham: async (req, res, next) => {
        try {
            console.log('remove thuc pham');
            const body = req.body;
            const result = await NhapHang.xuatThucPham(body.MaThucPham, body.SoLuong);
            res.json({});
        }
        catch (err) {
            next(err);
        }
    },
    timkiemThucPham: async (req, res, next) => {
        try {
            const body = req.body;
            console.log('search thuc pham keyword: ' + body.Keyword);
            const data = await ThucPham.timkiemThucPham(body.Keyword);
            res.json(data);
        }
        catch(e){
            console.log(e);
        }
    },
    themMonAn: async (req, res, next) => {
        try {
            const body = req.body;
            console.log('them mon an: ' + body.MaMonAn);
            await MonAn.themMonAn(body.MaMonAn, body.TenMonAn, body.GiaBan, body.HinhAnh, body.newCongThuc);
            res.json({});
        }
        catch(e){
            console.log(e);
        }
    },
    themThucPham: async (req, res, next) => {
        try {
            const body = req.body;
            console.log('them thuc pham: ' + body.MaThucPham);
            await ThucPham.themThucPham(body.MaThucPham, body.TenThucPham, body.DonViTinh);
            res.json({});
        }
        catch(e){
            console.log(e);
        }
    },
    nhapChiTieu: async (req, res, next) => {
        try {
            const body = req.body;
            console.log('set chi tieu: ' + body.id);
            const data = await ChiTieu.nhapChiTieu(body.id, body.currentDate, body.portion);
            res.json(data);
        }
        catch(e){
            console.log(e);
        }
    },
    kiemtraChiTieu: async (req, res, next) => {
        try {
            const body = req.body;
            const data = await ChiTieu.kiemtraChiTieu(body.id, body.currentDate);
            res.json(data);
        }
        catch(e){
            console.log(e);
        }
    },
    thongKeDoanhThu: async (req, res, next) => {
        try {
            console.log('thong ke doanh thu ');
            const body = req.body;
            const result = await DoanhThu.thongKeDoanhThu(body.Date, body.Type);
            console.log(result);
            res.json(result);
        } catch (err) {
            next(err);
        }
    },
    thongKeNhap: async (req, res, next) => {
        try {
            console.log('thong ke tien nhap kho ');
            const body = req.body;
            const result = await NhapHang.thongKeNhap(body.Date, body.Type);
            console.log(result);
            res.json(result);
        } catch (err) {
            next(err);
        }
    },
    getStaff: async (req, res, next) => {
        try {
            console.log('nhan su');
            const data = await NhanSu.getNhanSu();
            res.json(data);
        } catch (err) {
            next(err);
        }
    },
    xoaNhanSu: async (req, res, next) => {
        try {
            console.log('xoa nhan vien');
            const body = req.body;
            await NhanSu.xoaNhanSu(body.Username);
            res.json({});
        } catch (err) {
            next(err);
        }

    },
    themNhanSu: async (req, res, next) => {
        try {
            console.log('insert nhan su');
            const body = req.body;
            await NhanSu.themNhanSu(body.Username, body.Password, body.Admin, body.Name);
            res.json({});
        } catch (e) {
            next(e);
        }
    },
    nhapGioLam:  async (req, res, next) => {
        try {
            console.log('insert gio lam');
            const body = req.body;
            await LamViec.nhapGioLam(body.Username, body.GioLam,body.Ngay);
            res.json({});
        } catch (e) {
            next(e);
        }
    },
    getWork:async (req, res, next) => {
        try {
            console.log('thong ke gio lam ',req.body);
            const result = await LamViec.getLamViec(req.body.Date,req.body.Type);
            res.json(result);
        } catch (err) {
            next(err);
        }
    },
    themKhachHang: async (req, res, next) => {
        try {
            const body = req.body;
            const result = await KhachHang.themKhachHang(body.SoDienThoai);
            res.json(result);
        }
        catch(e){
            console.log(e);
        }
    },
    getCustomer: async (req, res, next) => {
        try {
            const body = req.body;
            const data = await KhachHang.timkiemKhachHang(body.SoDienThoai);
            res.json(data);
        }
        catch(e){
            console.log(e);
        }
    },
    capNhatKhachHang: async (req, res, next) => {
        try {
            const body = req.body;
            const data = await KhachHang.timkiemKhachHang(body.SoDienThoai);
            const KM = await KhachHang.layKhuyenMai();
            const newTichLuy = data.TichLuy + body.ThanhToan;
            let newGiamGia = Math.min(Math.floor(newTichLuy / KM.MocKhuyenMai) * KM.GiaTriKhuyenMai, KM.GioiHanKhuyenMai);
            console.log(newTichLuy);
            console.log(newGiamGia);
            await KhachHang.capNhatKhachHang(body.SoDienThoai, newTichLuy, newGiamGia);
            res.json({});
        }
        catch(e){
            console.log(e);
        }
    },
    layKhuyenMai: async (req, res, next) => {
        try {
            const KM = await KhachHang.layKhuyenMai();
            res.json(KM);
        }
        catch(e){
            console.log(e);
        }
    },
    capNhatKhuyenMai: async (req, res, next) => {
        try {
            const body = req.body;
            await KhachHang.capNhatKhuyenMai(body.MocKhuyenMai, body.GiaTriKhuyenMai, body.GioiHanKhuyenMai);
            await KhachHang.capNhatGiamGia(body.MocKhuyenMai, body.GiaTriKhuyenMai, body.GioiHanKhuyenMai);
            res.json({});
        }
        catch(e){
            console.log(e);
        }
    }
}