class MonAn {
    constructor(rawMonAn) {
        this.MaMonAn = rawMonAn.MaMonAn;
        this.TenMonAn = rawMonAn.TenMonAn;
        this.GiaBan = rawMonAn.GiaBan;
        this.HanSuDung = rawMonAn.HanSuDung;
        this.SoLuong=rawMonAn.SoLuong;
    }
};

class ThucPham {
    constructor(rawThucPham) {
        this.MaThucPham = rawThucPham.MaThucPham;
        this.TenThucPham = rawThucPham.TenThucPham;
        this.DonViTinh = rawThucPham.DonViTinh;
        this.SoLuongTrongKho = rawThucPham.SoLuongTrongKho;
    }
};

module.exports = { MonAn, ThucPham };