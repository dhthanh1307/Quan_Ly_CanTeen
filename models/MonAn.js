const db = require('../utilities/database');

module.exports = class MonAn {
    constructor(rawMonAn) {
        this.MaMonAn = rawMonAn.MaMonAn;
        this.TenMonAn = rawMonAn.TenMonAn;
        this.GiaBan = rawMonAn.GiaBan;
        this.HanSuDung = rawMonAn.HanSuDung;
        this.SoLuong = rawMonAn.SoLuong;
        this.HinhAnh = rawMonAn.HinhAnh;
    }
    static async getAllMonAn() {
        return await db.getAllMonAn();
    }
    static async capNhapMonAn(MaMonAn, TenMonAn, GiaBan) {
        return await db.capNhapMonAn(MaMonAn, TenMonAn, GiaBan);
    }
};