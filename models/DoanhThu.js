const db = require('../utilities/database');

module.exports = class DoanhThu {
    constructor(rawDoanhThu) {
        this.MaMonAn = rawDoanhThu.MaMonAn;
        this.TenMonAn = rawDoanhThu.TenMonAn;
        this.GiaBan = rawDoanhThu.GiaBan;
        this.SoLuongBan = rawDoanhThu.SoLuongBan;
        this.TongThanhTien = rawDoanhThu.TongThanhTien;
    }
    static async thongKeDoanhThu(Date, Type) {
        return await db.thongKeDoanhThu(Date, Type);
    }
};