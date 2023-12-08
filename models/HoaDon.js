const db = require('../utilities/database');

module.exports = class HoaDon {
    constructor(rawHoaDon) {
        this.MaBanHang = rawHoaDon.MaBanHang;
        this.PhuongThuc = rawHoaDon.PhuongThuc;
        this.SoTien = rawHoaDon.SoTien;
    }
    static async nhapHoaDon(PhuongThuc, SoTien) {
        return await db.nhapHoaDon(PhuongThuc, SoTien);
    }
    
};