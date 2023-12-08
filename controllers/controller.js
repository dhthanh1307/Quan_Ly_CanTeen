const db = require('../utilities/database');

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
            const result = await db.timkiemTaiKhoan(body.username, body.password, body.isAdmin);
            res.json({ result: result });
        }
        catch (err) {
            next(err);
        }
    },
    getAllFood: async (req, res, next) => {
        try {
            console.log('all mon an');
            const data = await db.getAllMonAn();
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
            const result = await db.capNhapMonAn(body.MaMonAn, body.TenMonAn, body.GiaBan);
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
            const chitieu = await db.checkChiTieu(body.ListEdit);
            const thucpham = await db.kiemtraThucPham(body.ListEdit);
            console.log('thucpham: ', thucpham);
            console.log('chitieu: ', chitieu);

            if (chitieu && thucpham) {
                ktra = true;
                console.log('thanhtoan');
                const mabanhang = await db.nhapHoaDon(body.PhuongThuc, body.SoTien);
                for (let i = 0; i < body.ListEdit.length; i++)
                    if (body.ListEdit[i].SoLuong > 0)
                        await db.nhapBanHang(mabanhang, body.ListEdit[i]);
                db.capNhatChiTieu(body.ListEdit);
                db.capNhatThucPham(body.ListEdit);
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
            const data = await db.getAllThucPham();
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
            const result = await db.nhapThucPham(body.MaThucPham, body.SoLuongNhap, body.NgayNhap, body.GiaNhap);
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
            const result = await db.xuatThucPham(body.MaThucPham, body.SoLuong);
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
            const data = await db.timkiemThucPham(body.Keyword);
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
            const data = await db.nhapChiTieu(body.id, body.currentDate, body.portion);
            res.json(data);
        }
        catch(e){
            console.log(e);
        }
    },
    kiemtraChiTieu: async (req, res, next) => {
        try {
            const body = req.body;
            const data = await db.checkPortionSet(body.id, body.currentDate);
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
            const result = await db.thongKeDoanhThu(body.Date, body.Type);
            console.log(result);
            res.json(result);
        } catch (err) {
            next(err);
        }
    },
    getStaff: async (req, res, next) => {
        try {
            console.log('nhan su');
            const data = await db.getNhanSu();
            res.json(data);
        } catch (err) {
            next(err);
        }
    },
    xoaNhanSu: async (req, res, next) => {
        try {
            console.log('xoa nhan vien');
            const body = req.body;
            await db.xoaNhanSu(body.Username);
            res.json({});
        } catch (err) {
            next(err);
        }

    },
    themNhanSu: async (req, res, next) => {
        try {
            console.log('insert nhan su');
            const body = req.body;
            await db.themNhanSu(body.Username, body.Password, body.Admin,body.Name);
            res.json({});
        } catch (e) {
            next(e);
        }
    },
    nhapGioLam:  async (req, res, next) => {
        try {
            console.log('insert gio lam');
            const body = req.body;
            await db.nhapGioLam(body.Username, body.GioLam,body.Ngay);
            res.json({});
        } catch (e) {
            next(e);
        }
    },
    getWork:async (req, res, next) => {
        try {
            console.log('thong ke gio lam ');
            const body = req.body;
            const result = await db.getLamViec();
            res.json(result);
        } catch (err) {
            next(err);
        }
    },
    themKhachHang: async (req, res, next) => {
        try {
            const body = req.body;
            const result = await db.themKhachHang(body.SoDienThoai);
            res.json(result);
        }
        catch(e){
            console.log(e);
        }
    },
    getCustomer: async (req, res, next) => {
        try {
            const body = req.body;
            const data = await db.getKhachHang(body.SoDienThoai);
            res.json(data);
        }
        catch(e){
            console.log(e);
        }
    },
    capNhatKhachHang: async (req, res, next) => {
        try {
            const body = req.body;
            const data = await db.getKhachHang(body.SoDienThoai);
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
                newGiamGia = 0.05;
            }
            else newGiamGia = 1;
            await db.capNhatKhachHang(body.SoDienThoai, newTichLuy, newGiamGia);
        }
        catch(e){
            console.log(e);
        }
    },
}