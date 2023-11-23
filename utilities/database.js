require('dotenv').config();
const { MonAn, ThucPham } = require('./general');
const pgp = require('pg-promise')({
    capSQL: true
});
const cn = {
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    database: process.env.DBNAME,
    user: process.env.DBUSER,
    password: process.env.DBPW,
    max: 30
};
const db = pgp(cn);

module.exports = {
    findUser: async (username, password, isAdmin) => {
        const query = `SELECT * FROM "User" WHERE "Username" = $1 AND "Password" = $2 AND "isAdmin" = $3`;
        const values = [username, password, isAdmin];
        const data = await db.query(query, values);
        if (data.length > 0) {
            return true;
        }
        else return false;
    },
    getAllMonAn: async () => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            const data = await dbcn.any(`SELECT * FROM "MonAn" ORDER BY "MaMonAn" ASC`);
            return data.map(dbMonAn => new MonAn(dbMonAn));
        } catch (error) {
            throw error;
        } finally {
            dbcn.done();
        }
    },
    updateMonAn: async (MaMonAn, TenMonAn, GiaBan) => {
        const query = `UPDATE "MonAn" SET "TenMonAn" = '${TenMonAn}', "GiaBan" = '${GiaBan}' WHERE "MaMonAn" = '${MaMonAn}'`;
        await db.query(query);
    },

    insertHoaDon: async (PhuongThuc, SoTien) => {
        const query = `INSERT INTO "HoaDon"("PhuongThuc","SoTien") VALUES ( '${PhuongThuc}', '${SoTien}') RETURNING "MaBanHang"`;
        const result = await db.query(query);
        return result[0].MaBanHang;
    },
    insertBanHang: async (MaBanHang, MonAn) => {
        console.log(MonAn);
        const currentDate = new Date();
        const query = `INSERT INTO "BanHang" VALUES ('${MaBanHang}','${MonAn.MaMonAn}','${MonAn.SoLuong}','${currentDate.toISOString()}')`;
        await db.query(query);
    },
    getAllThucPham: async () => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            const data = await dbcn.any(`SELECT * FROM "ThucPham" ORDER BY "MaThucPham" ASC`);
            return data.map(dbThucPham => new ThucPham(dbThucPham));
        } catch (error) {
            throw error;
        } finally {
            dbcn.done();
        }
    },
    insertThucPham: async (MaThucPham, SoLuongNhap, NgayNhap, GiaNhap) => {
        const insertQuery = `INSERT INTO "NhapHang" ("MaThucPham", "SoLuongNhap", "NgayNhap", "GiaNhap") VALUES ($1, $2, $3, $4) RETURNING "MaNhapHang"`;
        const insertValues = [MaThucPham, SoLuongNhap, NgayNhap, GiaNhap];
        const insertResult = await db.query(insertQuery, insertValues);

        if (insertResult.length > 0) {
            const updateQuery = `UPDATE "ThucPham" SET "SoLuongTrongKho" = "SoLuongTrongKho" + $1 WHERE "MaThucPham" = $2`;
            const updateValues = [SoLuongNhap, MaThucPham];
            await db.query(updateQuery, updateValues);
        }
        return insertResult[0].MaNhapHang;
    },
    removeThucPham: async (MaThucPham, SoLuong) => {
        const updateQuery = `UPDATE "ThucPham" SET "SoLuongTrongKho" = "SoLuongTrongKho" - $1 WHERE "MaThucPham" = $2`;
        const updateValues = [SoLuong, MaThucPham];
        await db.query(updateQuery, updateValues);

    },
    find: async (tbName, ID) => {
        const query = `SELECT * FROM "${tbName}" WHERE id = ${ID}`;
        const data = await db.query(query);
        return data[0];
    },
    update: async (tbName, ID, person) => {
        const query = `UPDATE "${tbName}" SET first_name = '${person.first_name}', last_name = '${person.last_name}', email = '${person.email}', avatar = '${person.avatar}' WHERE id = ${ID}`;
        await db.query(query);
    },
    remove: async (tbName, ID) => {
        const query = `DELETE FROM "${tbName}" WHERE id = ${ID}`;
        await db.query(query);
    },
    clear: async (tbName) => {
        const query = `DELETE FROM "${tbName}"`;
        await db.query(query);
    },
    count: async (tbName) => {
        const query = `SELECT COUNT(*) FROM "${tbName}"`;
        const rs = await db.query(query);
        return rs[0].count;
    }
}