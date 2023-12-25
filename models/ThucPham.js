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