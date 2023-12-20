const db = require('../utilities/database');

module.exports = class MonAn {
    constructor(rawMonAn) {
        this.MaMonAn = rawMonAn.MaMonAn;
        this.TenMonAn = rawMonAn.TenMonAn;
        this.GiaBan = rawMonAn.GiaBan;
        this.HanSuDung = rawMonAn.HanSuDung;
        this.SoLuong = rawMonAn.SoLuong;
        this.HinhAnh = rawMonAn.HinhAnh;
        this.CongThuc = rawMonAn.CongThuc;
        this.ChiTieu = rawMonAn.ChiTieu;
        this.SoLuongTrongKho = rawMonAn.SoLuongTrongKho;
    }
    static async themMonAn(MaMonAn, TenMonAn, GiaBan, HanSuDung, HinhAnh, newCongThuc) {
        await db.themMonAn(MaMonAn, TenMonAn, GiaBan, HanSuDung, HinhAnh, newCongThuc);
    }
    static async getAllMonAn() {
        return await db.getAllMonAn();
    }
    static async getAllMonAnBan() {
        return await db.getAllMonAnToSell();
    }
    static async capNhapMonAn(MaMonAn, TenMonAn, GiaBan, newCongThuc) {
        return await db.capNhapMonAn(MaMonAn, TenMonAn, GiaBan, newCongThuc);
    }
};