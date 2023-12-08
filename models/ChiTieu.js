const db = require('../utilities/database');

module.exports = class ChiTieu {
    constructor(rawChiTieu) {
        this.MaMonAn = rawChiTieu.MaMonAn;
        this.Ngay = rawChiTieu.Ngay;
        this.SoLuong = rawChiTieu.SoLuong;
    }
    static async kiemTraSoLuongChiTieu(ListEdit) {
        return await db.checkChiTieu(ListEdit);
    }
    static async capNhatChiTieu(ListEdit) {
        await db.capNhatChiTieu(ListEdit);
    }
    static async nhapChiTieu(id, currentDate, portion) {
        return await db.nhapChiTieu(id, currentDate, portion);
    }
    static async kiemtraChiTieu(id, currentDate) {
        return await db.checkPortionSet(id, currentDate);
    }
};