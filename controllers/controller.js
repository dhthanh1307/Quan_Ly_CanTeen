const db = require('../utilities/database');

module.exports = {
    render: async (req, res, next) => {
        try {
            res.render('_index');
        } catch (err) {
            next(err);
        }
    },
    findUser: async (req, res, next) => {
        try {
            console.log('find user');
            const body = req.body;
            const result = await db.findUser(body.username, body.password, body.isAdmin);
            if (result) {
                res.send(true);
            }
            else {
                res.send(false);
            }
        } catch (err) {
            next(err);
        }
    },
    getAllMonAn: async (req, res, next) => {
        try {
            console.log('all mon an');
            const data = await db.getAllMonAn();
            res.json(data);
        } catch (err) {
            next(err);
        }
    },
    updateMonAn: async (req, res, next) => {
        try {
            console.log('update mon an');
            const body = req.body;
            const result = await db.updateMonAn(body.MaMonAn, body.TenMonAn, body.GiaBan);
            res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    },
    getAllThucPham: async (req, res, next) => {
        try {
            console.log('all thuc pham');
            const data = await db.getAllThucPham();
            res.json(data);
        } catch (err) {
            next(err);
        }
    },
    insertThucPham: async (req, res, next) => {
        try {
            console.log('insert thuc pham');
            const body = req.body;
            const result = await db.insertThucPham(body.MaThucPham, body.SoLuongNhap, body.NgayNhap, body.GiaNhap);
            res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    },
    removeThucPham: async (req, res, next) => {
        try {
            console.log('remove thuc pham');
            const body = req.body;
            const result = await db.removeThucPham(body.MaThucPham, body.SoLuong);
            res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    }
}