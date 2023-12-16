const NhanSu = require('../models/NhanSu');
const MonAn = require('../models/MonAn');
const ThucPham = require('../models/ThucPham');
const ChiTieu = require('../models/ChiTieu');
const DoanhThu = require('../models/DoanhThu');
const KhachHang = require('../models/KhachHang');
const HoaDon = require('../models/HoaDon');
const LamViec = require('../models/LamViec');
const BanHang = require('../models/BanHang');


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
    capnhatMonAn: async (req, res, next) => {
        try {
            console.log('update mon an');
            const body = req.body;
            const result = await MonAn.capNhapMonAn(body.MaMonAn, body.TenMonAn, body.GiaBan);
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
                const mabanhang = await HoaDon.nhapHoaDon(body.PhuongThuc, body.SoTien);//TODO
                for (let i = 0; i < body.ListEdit.length; i++)
                    if (body.ListEdit[i].SoLuong > 0)
                        await BanHang.nhapBanHang(mabanhang, body.ListEdit[i], body.GiamGia);//TODO
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
            const result = await ThucPham.nhapThucPham(body.MaThucPham, body.SoLuongNhap, body.NgayNhap, body.GiaNhap);
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
            const result = await ThucPham.xuatThucPham(body.MaThucPham, body.SoLuong);
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
            const data = await ChiTieu.kiemTraChiTieu(body.id, body.currentDate);
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
            await LamViec.nhapGioLam(body.Username, body.GioLam,body.Ngay);//TODO
            res.json({});
        } catch (e) {
            next(e);
        }
    },
    getWork:async (req, res, next) => {
        try {
            console.log('thong ke gio lam ');
            const body = req.body;
            const result = await LamViec.getLamViec();//TODO
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
            const newTichLuy = data.TichLuy + body.ThanhToan;
            let newGiamGia = 0;
            if (newTichLuy < 100000) {
                newGiamGia = 0;
            }
            else if (newTichLuy >= 100000 && newTichLuy < 300000) {
                newGiamGia = 0.03;
            }
            else if (newTichLuy >= 300000 && newTichLuy < 500000) {
                newGiamGia = 0.05;
            }
            else if (newTichLuy >= 500000 && newTichLuy < 1000000) {
                newGiamGia = 0.07;
            }
            else newGiamGia = 1;
            console.log(newTichLuy)
            await KhachHang.capNhatKhachHang(body.SoDienThoai, newTichLuy, newGiamGia);
        }
        catch(e){
            console.log(e);
        }
    },
}