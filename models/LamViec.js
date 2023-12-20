const db = require('../utilities/database');

module.exports = class LamViec {
    constructor(rawLamViec) {
        this.Username = rawLamViec.Username;
        this.Sogio = rawLamViec.Sogio;
        this.Ngay = rawLamViec.Ngay;
    }
    static async nhapGioLam (username,giolam,ngay) {
        return await db.nhapGioLam (username,giolam,ngay);
    }
    static async getLamViec (date,type) {
        return await db.getLamViec (date,type);
    }
};