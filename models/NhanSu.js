const db = require('../utilities/database');

module.exports = class NhanSu {
    constructor(rawNhanSu) {
        this.Username = rawNhanSu.Username;
        this.Password = rawNhanSu.Password;
        this.isAdmin = rawNhanSu.isAdmin;
        this.Name = rawNhanSu.Name;
    }
    static async timkiemTaiKhoan (Username, Password, isAdmin) {
        return await db.timkiemTaiKhoan(Username, Password, isAdmin);
    }
    static async getNhanSu() {
        return await db.getNhanSu();
    }
    static async xoaNhanSu(Username) {
        await db.xoaNhanSu(Username);
    }
    static async themNhanSu(Username, Password, Admin, Name) {
        await db.themNhanSu(Username, Password, Admin, Name);
    }
};