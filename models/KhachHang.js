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
    static async timkiemKhachHang(SoDienThoai) {
        return await db.getKhachHang(SoDienThoai);
    }
    static async capNhatKhachHang(SoDienThoai, newTichLuy, newGiamGia) {
        await db.capNhatKhachHang(SoDienThoai, newTichLuy, newGiamGia);
    }
    static async layKhuyenMai() {
        return await db.layKhuyenMai();
    }
    static async capNhatKhuyenMai(MocKhuyenMai, GiaTriKhuyenMai, GioiHanKhuyenMai) {
        await db.capNhatKhuyenMai(MocKhuyenMai, GiaTriKhuyenMai, GioiHanKhuyenMai);
    }
    static async capNhatGiamGia(MocKhuyenMai, GiaTriKhuyenMai, GioiHanKhuyenMai) {
        return await db.capNhatGiamGia(MocKhuyenMai, GiaTriKhuyenMai, GioiHanKhuyenMai);
    }
};