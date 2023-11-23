class MonAn {
    constructor(rawMonAn) {
        this.MaMonAn = rawMonAn.MaMonAn;
        this.TenMonAn = rawMonAn.TenMonAn;
        this.GiaBan = rawMonAn.GiaBan;
        this.HanSuDung = rawMonAn.HanSuDung;
        this.SoLuong=rawMonAn.SoLuong;
    }
};

module.exports = { MonAn };