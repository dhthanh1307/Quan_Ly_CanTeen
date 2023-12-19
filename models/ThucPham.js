const db = require('../utilities/database');

module.exports = class ThucPham {
    constructor(rawThucPham) {
        this.MaThucPham = rawThucPham.MaThucPham;
        this.TenThucPham = rawThucPham.TenThucPham;
        this.DonViTinh = rawThucPham.DonViTinh;
        this.SoLuongTrongKho = rawThucPham.SoLuongTrongKho;
    }
    static async themThucPham(MaThucPham, TenThucPham, DonViTinh) {
        await db.themThucPham(MaThucPham, TenThucPham, DonViTinh);
    }
    static async getThucPham() {
        return await db.getAllThucPham();
    }
    static async nhapThucPham(MaThucPham, SoLuongNhap, NgayNhap, GiaNhap) {
        return await db.nhapThucPham(MaThucPham, SoLuongNhap, NgayNhap, GiaNhap);
    }
    static async xuatThucPham(MaThucPham, SoLuong) {
        return await db.xuatThucPham(MaThucPham, SoLuong);
    }
    static async timkiemThucPham(Keyword) {
        return await db.timkiemThucPham(Keyword);
    }
    static async kiemtraThucPham(ListEdit) {
        return await db.kiemtraThucPham(ListEdit);
    }
    static async capNhatThucPham(ListEdit) {
        await db.capNhatThucPham(ListEdit);
    }
};