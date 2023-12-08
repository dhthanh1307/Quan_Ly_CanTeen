const db = require('../utilities/database');

module.exports = class BanHang {
    constructor(rawBanHang) {
        this.MaBanHang = rawBanHang.MaBanHang;
        this.MaMonAn = rawBanHang.MaMonAn;
        this.SoLuong = rawBanHang.SoLuong;
        this.NgayBan = rawBanHang.NgayBan;

    }
    static async nhapBanHang(MaBanHang, MonAn) {
        return await db.nhapBanHang(MaBanHang, MonAn);
    }
    
};