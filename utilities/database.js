require('dotenv').config();
const { MonAn, ThucPham, DoanhThu, NhanSu } = require('./general');
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
    checkChiTieu: async (listmonan) => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            for (const monan of listmonan) {
                try {
                    const data = await dbcn.any(`
                        SELECT * FROM "ChiTieu"
                        WHERE "Ngay" = $1 AND "MaMonAn" = $2 AND "SoLuong" < $3
                    `, [new Date(), monan.MaMonAn, monan.SoLuong]);

                    if (data.length > 0) {
                        return false;
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            return true;
        } catch (error) {
            throw error;
        } finally {
            dbcn.done();
        }
    },
    checkThucPham: async (listmonan) => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            for (const monan of listmonan) {
                try {
                    const data = await dbcn.any(`
                        SELECT * FROM "ThucPham"
                        WHERE  "MaThucPham" = $1 AND "SoLuongTrongKho" >= $2 AND $2!=0
                    `, [monan.MaMonAn, monan.SoLuong]);
                    console.log('monan.MaMonAn:', monan.MaMonAn);
                    console.log('monan.SoLuong:', monan.SoLuong);
                    console.log('data:', data);
    
                    if (data.length > 0) {
                        return true;
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            return false;
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
        const currentDate = new Date();
        const query = `INSERT INTO "BanHang" VALUES ('${MaBanHang}','${MonAn.MaMonAn}','${MonAn.SoLuong}','${currentDate.toISOString()}')`;
        await db.query(query);
    },
    insertStaff: async (username, password, isadmin) => {
        const query = `INSERT INTO "User" VALUES ('${username}','${password}','${isadmin}') ON CONFLICT ("Username") DO NOTHING`;
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
    getNhanSu: async () => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            const data = await dbcn.any(`SELECT * FROM "User" WHERE "isAdmin"=false`);
            return data.map(dbNhanSu => new NhanSu(dbNhanSu));
        } catch (error) {
            throw error;
        } finally {
            dbcn.done();
        }
    },
    thongke: async (Date, type) => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            //     const data = await dbcn.any(`SELECT
            //                                     "MonAn"."MaMonAn",
            //                                     "MonAn"."TenMonAn",
            //                                     "MonAn"."GiaBan",
            //                                     SUM("BanHang"."SoLuong") AS "SoLuongBan",
            //                                     SUM("BanHang"."SoLuong" * "MonAn"."GiaBan") AS "TongThanhTien"
            //                                 FROM
            //                                     "BanHang"
            //                                 JOIN
            //                                     "MonAn" ON "BanHang"."MaMonAn" = "MonAn"."MaMonAn"
            //                                 WHERE
            //                                     "BanHang"."NgayBan" = $1
            //                                 GROUP BY
            //                                     "MonAn"."MaMonAn", "MonAn"."TenMonAn", "MonAn"."GiaBan";
            //  `,[Date]);
            //     return data.map(dbDoanhThu => new DoanhThu(dbDoanhThu));
            let query = `
            SELECT
                "MonAn"."MaMonAn",
                "MonAn"."TenMonAn",
                "MonAn"."GiaBan",
                SUM("BanHang"."SoLuong") AS "SoLuongBan",
                SUM("BanHang"."SoLuong" * "MonAn"."GiaBan") AS "TongThanhTien"
            FROM
                "BanHang"
            JOIN
                "MonAn" ON "BanHang"."MaMonAn" = "MonAn"."MaMonAn"
            WHERE
        `;


            if (type === 'date') {
                query += `"BanHang"."NgayBan" = $1`;
            } else if (type === 'month') {
                query += `EXTRACT(MONTH FROM "BanHang"."NgayBan"::date) = EXTRACT(MONTH FROM $1::date)
                      AND EXTRACT(YEAR FROM "BanHang"."NgayBan"::date) = EXTRACT(YEAR FROM $1::date)`;
            } else if (type === 'year') {
                query += `EXTRACT(YEAR FROM "BanHang"."NgayBan"::date) = EXTRACT(YEAR FROM $1::date)`;
            }

            query += `
            GROUP BY
                "MonAn"."MaMonAn", "MonAn"."TenMonAn", "MonAn"."GiaBan";
        `;

            const data = await dbcn.any(query, [Date]);
            return data.map(dbDoanhThu => new DoanhThu(dbDoanhThu));
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
    searchThucPham: async (Keyword) => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            const data = await dbcn.any(`SELECT * FROM "ThucPham" WHERE "TenThucPham" ILIKE '%${Keyword}%' ORDER BY "MaThucPham" ASC`);
            return data.map(dbThucPham => new ThucPham(dbThucPham));
        } catch (error) {
            throw error;
        } finally {
            dbcn.done();
        }
    },
    setPortion: async (id, currentDate, portion) => {
        const checkQuery = `SELECT SUM(CT."SoLuongThucPham" * $1) <= SUM(TP."SoLuongTrongKho") AS check FROM "CongThuc" CT JOIN "ThucPham" TP ON CT."MaThucPham" = TP."MaThucPham" WHERE CT."MaMonAn" = $2 GROUP BY CT."MaMonAn"`;
        const checkValues = [portion, id];
        const checkResult = await db.any(checkQuery, checkValues);

        if (checkResult[0].check) {
            const updateQuery = `UPDATE "ThucPham" TP SET "SoLuongTrongKho" = "SoLuongTrongKho" - CT."SoLuongThucPham" * $1 FROM "CongThuc" CT WHERE CT."MaMonAn" = $2 AND TP."MaThucPham" = CT."MaThucPham"`;
            const updateValues = [portion, id];
            await db.none(updateQuery, updateValues);
    
            const insertQuery = `INSERT INTO "ChiTieu" ("MaMonAn", "Ngay", "SoLuong") VALUES ($1, $2, $3)`;
            const insertValues = [id, currentDate, portion];
            await db.none(insertQuery, insertValues);
    
            return true;
        } else {
            return false;
        }
    },
    checkPortionSet: async (id, currentDate) => {
        const checkQuery = `SELECT EXISTS (SELECT 1 FROM "ChiTieu" WHERE "MaMonAn" = $1 AND "Ngay" = $2)`;
        const checkValues = [id, currentDate];
        const exists = await db.one(checkQuery, checkValues);

        return exists.exists;
    },
    removeStaff: async (username) => {
        const deleteQuery = `DELETE FROM "User" WHERE "Username" = $1 RETURNING *`;
        const deleteValues = [username];
        await db.query(deleteQuery, deleteValues);

    }
}