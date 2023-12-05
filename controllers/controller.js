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
    findUser: async (req, res, next) => {
        try {
            console.log('find user');
            const body = req.body;
            const result = await db.findUser(body.username, body.password, body.isAdmin);
            res.json({ result: result });
        }
        catch (err) {
            next(err);
        }
    },
    getAllMonAn: async (req, res, next) => {
        try {
            console.log('all mon an');
            const data = await db.getAllMonAn();
            res.json(data);
        }
        catch (err) {
            next(err);
        }
    },
    updateMonAn: async (req, res, next) => {
        try {
            console.log('update mon an');
            const body = req.body;
            const result = await db.updateMonAn(body.MaMonAn, body.TenMonAn, body.GiaBan);
            res.json({});
        }
        catch (err) {
            next(err);
        }
    },

    thanhtoan: async (req, res, next) => {
        try {
            console.log('check so luong');
            var ktra = false;
            const body = req.body;
            const chitieu = await db.checkChiTieu(body.ListEdit);
            const thucpham = await db.checkThucPham(body.ListEdit);
            console.log('thucpham: ', thucpham);
            console.log('chitieu: ', chitieu);

            if (chitieu && thucpham) {
                ktra = true;
                console.log('thanhtoan');
                const mabanhang = await db.insertHoaDon(body.PhuongThuc, body.SoTien);
                for (let i = 0; i < body.ListEdit.length; i++)
                    if (body.ListEdit[i].SoLuong > 0)
                        await db.insertBanHang(mabanhang, body.ListEdit[i]);
                db.updateChiTieu(body.ListEdit);
                db.updateThucPham(body.ListEdit);
            }
            res.json({ ktra });

        }
        catch (e) {
            next(e);
        }
    },
    getAllThucPham: async (req, res, next) => {
        try {
            console.log('all thuc pham');
            const data = await db.getAllThucPham();
            res.json(data);
        }
        catch (err) {
            next(err);
        }
    },
    insertThucPham: async (req, res, next) => {
        try {
            console.log('insert thuc pham');
            const body = req.body;
            const result = await db.insertThucPham(body.MaThucPham, body.SoLuongNhap, body.NgayNhap, body.GiaNhap);
            res.json({});
        }
        catch (err) {
            next(err);
        }
    },
    removeThucPham: async (req, res, next) => {
        try {
            console.log('remove thuc pham');
            const body = req.body;
            const result = await db.removeThucPham(body.MaThucPham, body.SoLuong);
            res.json({});
        }
        catch (err) {
            next(err);
        }
    },
    searchThucPham: async (req, res, next) => {
        try {
            const body = req.body;
            console.log('search thuc pham keyword: ' + body.Keyword);
            const data = await db.searchThucPham(body.Keyword);
            res.json(data);
        }
        catch(e){
            console.log(e);
        }
    },
    setPortion: async (req, res, next) => {
        try {
            const body = req.body;
            console.log('set chi tieu: ' + body.id);
            const data = await db.setPortion(body.id, body.currentDate, body.portion);
            res.json(data);
        }
        catch(e){
            console.log(e);
        }
    },
    checkPortionSet: async (req, res, next) => {
        try {
            const body = req.body;
            const data = await db.checkPortionSet(body.id, body.currentDate);
            res.json(data);
        }
        catch(e){
            console.log(e);
        }
    },
    thongke: async (req, res, next) => {
        try {
            console.log('thong ke doanh thu ');
            const body = req.body;
            const result = await db.thongke(body.Date, body.Type);
            console.log(result);
            res.json(result);
        } catch (err) {
            next(err);
        }
    },
    nhansu: async (req, res, next) => {
        try {
            console.log('nhan su');
            const data = await db.getNhanSu();
            res.json(data);
        } catch (err) {
            next(err);
        }
    },
    removeStaff: async (req, res, next) => {
        try {
            console.log('xoa nhan vien');
            const body = req.body;
            await db.removeStaff(body.Username);
            res.json({});
        } catch (err) {
            next(err);
        }

    },
    insertStaff: async (req, res, next) => {
        try {
            console.log('insert nhan su');
            const body = req.body;
            await db.insertStaff(body.Username, body.Password, body.Admin,body.Name);
            res.json({});
        } catch (e) {
            next(e);
        }
    },
    insertGioLam:  async (req, res, next) => {
        try {
            console.log('insert gio lam');
            const body = req.body;
            await db.insertGioLam(body.Username, body.GioLam,body.Ngay);
            res.json({});
        } catch (e) {
            next(e);
        }
    },
    getGiolam:async (req, res, next) => {
        try {
            console.log('thong ke gio lam ');
            const body = req.body;
            const result = await db.getLamViec();
            res.json(result);
        } catch (err) {
            next(err);
        }
    },
    insertKhachHang: async (req, res, next) => {
        try {
            const body = req.body;
            const result = await db.insertKhachHang(body.SoDienThoai);
            res.json(result);
        }
        catch(e){
            console.log(e);
        }
    },
    getKhachHang: async (req, res, next) => {
        try {
            const body = req.body;
            const data = await db.getKhachHang(body.SoDienThoai);
            res.json(data);
        }
        catch(e){
            console.log(e);
        }
    },
    updateKhachHang: async (req, res, next) => {
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
            await db.updateKhachHang(body.SoDienThoai, newTichLuy, newGiamGia);
        }
        catch(e){
            console.log(e);
        }
    },
}