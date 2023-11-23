require('dotenv').config();
const { MonAn } = require('./general');
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
    insertHoaDon: async (PhuongThuc,SoTien)=>{
        const query=`INSERT INTO "HoaDon"("PhuongThuc","SoTien") VALUES ( '${PhuongThuc}', '${SoTien}') RETURNING "MaBanHang"`;
        const result =await db.query(query);
        return result[0].MaBanHang;
    },
    insertBanHang: async (MaBanHang,MonAn)=>{
        console.log(MonAn);
        const currentDate = new Date();
        const query=`INSERT INTO "BanHang" VALUES ('${MaBanHang}','${MonAn.MaMonAn}','${MonAn.SoLuong}','${currentDate.toISOString()}')`;
        await db.query(query);
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