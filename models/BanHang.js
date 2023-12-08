const db = require('../utilities/database');

module.exports = class BanHang {
    constructor(rawBanHang) {
        this.MaBanHang = rawBanHang.MaBanHang;
        this.MaMonAn = rawBanHang.MaMonAn;
        this.SoLuong = rawBanHang.SoLuong;
        this.NgayBan = rawBanHang.NgayBan;
        this.MucGiamGia = rawBanHang.MucGiamGia;
    }
    static async nhapBanHang(MaBanHang, MonAn, GiamGia) {
        return await db.nhapBanHang(MaBanHang, MonAn, GiamGia);
    }
};