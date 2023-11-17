const db = require('../utilities/database');

module.exports = {
    render: async (req, res, next) => {
        try {
            res.render('_index');
        } catch (err) {
            next(err);
        }
    },
    getAllMonAn: async (req, res, next) => {
        try {
            console.log('all');
            const data = await db.getAllMonAn();
            res.json(data);
        } catch (err) {
            next(err);
        }
    },
    updateMonAn: async (req, res, next) => {
        try {
            console.log('update');
            const body = req.body;
            const result = await db.updateMonAn(body.MaMonAn, body.TenMonAn, body.GiaBan);
            res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    }
}