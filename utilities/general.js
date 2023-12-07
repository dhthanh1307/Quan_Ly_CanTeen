class MonAn {
    constructor(rawMonAn) {
        this.MaMonAn = rawMonAn.MaMonAn;
        this.TenMonAn = rawMonAn.TenMonAn;
        this.GiaBan = rawMonAn.GiaBan;
        this.HanSuDung = rawMonAn.HanSuDung;
        this.SoLuong=rawMonAn.SoLuong;
        this.HinhAnh=rawMonAn.HinhAnh;
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
class DoanhThu{
    constructor(rawDoanhThu){
        this.MaMonAn=rawDoanhThu.MaMonAn;
        this.TenMonAn=rawDoanhThu.TenMonAn;
        this.GiaBan=rawDoanhThu.GiaBan;
        this.SoLuongBan=rawDoanhThu.SoLuongBan;
        this.TongThanhTien=rawDoanhThu.TongThanhTien;
    }
};
class NhanSu{
    constructor(temp){
        this.Username=temp.Username;
        this.Password=temp.Password;
        this.isAdmin=temp.isAdmin;
    }
};
class KhachHang {
    constructor(rawKhachHang) {
        this.SoDienThoai = rawKhachHang.SoDienThoai;
        this.TichLuy = rawKhachHang.TichLuy;
        this.GiamGia = rawKhachHang.GiamGia;
    }
};

module.exports = { MonAn, ThucPham,DoanhThu ,NhanSu, KhachHang};