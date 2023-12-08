const db = require('../utilities/database');

module.exports = class KhachHang {
    constructor(rawKhachHang) {
        this.SoDienThoai = rawKhachHang.SoDienThoai;
        this.TichLuy = rawKhachHang.TichLuy;
        this.GiamGia = rawKhachHang.GiamGia;
    }
    static async themKhachHang(SoDienThoai) {
        return await db.themKhachHang(SoDienThoai);
    }
    static async getKhachHang(SoDienThoai) {
        return await db.getKhachHang(SoDienThoai);
    }
    static async capNhatKhachHang(SoDienThoai, newTichLuy, newGiamGia) {
        await db.capNhatKhachHang(SoDienThoai, newTichLuy, newGiamGia);
    }
};