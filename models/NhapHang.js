const db = require('../utilities/database');

module.exports = class NhapHang {
    constructor(raw) {
        this.Ma = raw.MaThucPham;
        this.Ten = raw.TenThucPham;
        this.Gia = raw.GiaNhap;
        this.DonVi = raw.DonVi;
        this.SoLuong = raw.SoLuong;
        this.ThanhTien=raw.ThanhTien;
    }
    static async thongKeNhap(Date, Type) {
        return await db.thongKeNhap(Date, Type);
    }
    static async nhapThucPham(MaThucPham, SoLuongNhap, NgayNhap, GiaNhap) {
        return await db.nhapThucPham(MaThucPham, SoLuongNhap, NgayNhap, GiaNhap);
    }
    static async xuatThucPham(MaThucPham, SoLuong) {
        return await db.xuatThucPham(MaThucPham, SoLuong);
    }
};