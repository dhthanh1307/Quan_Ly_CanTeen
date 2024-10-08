require('dotenv').config();

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
    timkiemTaiKhoan: async (username, password, isAdmin) => {
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
            const data = await dbcn.any(`
                SELECT "MonAn".*, json_agg(json_build_object('MaThucPham', "ThucPham"."MaThucPham", 'TenThucPham', "ThucPham"."TenThucPham", 'DonViTinh', "ThucPham"."DonViTinh", 'SoLuongThucPham', COALESCE("CongThuc"."SoLuongThucPham", 0))) as "CongThuc"
                FROM "MonAn"
                    CROSS JOIN "ThucPham"
                    LEFT JOIN "CongThuc" ON "MonAn"."MaMonAn" = "CongThuc"."MaMonAn" AND "ThucPham"."MaThucPham" = "CongThuc"."MaThucPham"
                GROUP BY "MonAn"."MaMonAn"
                ORDER BY "MonAn"."MaMonAn" ASC
            `);
            return data;
        } catch (error) {
            throw error;
        } finally {
            dbcn.done();
        }
    },
    getAllMonAnToSell: async () => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            const data = await dbcn.any(`
                SELECT "MonAn".*, 
                    COALESCE(MAX(CASE WHEN "ChiTieu"."Ngay" = CURRENT_DATE THEN "ChiTieu"."SoLuong" ELSE 0 END), 0) as "ChiTieu",
                    COALESCE(MAX("ThucPham"."SoLuongTrongKho"), 0) as "SoLuongTrongKho"
                FROM "MonAn"
                    LEFT JOIN "ThucPham" ON "MonAn"."MaMonAn" = "ThucPham"."MaThucPham"
                    LEFT JOIN "ChiTieu" ON "MonAn"."MaMonAn" = "ChiTieu"."MaMonAn"
                GROUP BY "MonAn"."MaMonAn"
                ORDER BY "MonAn"."MaMonAn" ASC
            `);
            return data;
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
                if (monan.MaMonAn[0] == 'C' && monan.SoLuong > 0) {
                    try {
                        const data = await dbcn.any(`
                            SELECT * FROM "ChiTieu"
                            WHERE ("Ngay" = $1 AND "MaMonAn" = $2 AND "SoLuong" < $3 ) OR NOT EXISTS (
                                SELECT *
                                FROM "ChiTieu"
                                WHERE "Ngay" = $1 AND "MaMonAn" = $2
                              )
                        `, [new Date(), monan.MaMonAn, monan.SoLuong]);
                        if (data.length > 0) {
                            return false;
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
            return true;
        } catch (error) {
            throw error;
        } finally {
            dbcn.done();
        }
    },
    kiemtraThucPham: async (listmonan) => {
        let dbcn = null;
        try {
            dbcn = await db.connect();

            for (const monan of listmonan) {
                if (monan.MaMonAn[0] != 'C') {
                    try {
                        const data = await dbcn.any(`
                            SELECT * FROM "ThucPham"
                            WHERE  ("MaThucPham" = $1 AND "SoLuongTrongKho" < $2 ) 
                        `, [monan.MaMonAn, monan.SoLuong]);

                        if (data.length > 0) {
                            return false;
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
            return true;
        } catch (error) {
            throw error;
        } finally {
            dbcn.done();
        }
    },
    capNhapMonAn: async (MaMonAn, TenMonAn, GiaBan, newCongThuc) => {
        const query = `UPDATE "MonAn" SET "TenMonAn" = '${TenMonAn}', "GiaBan" = '${GiaBan}' WHERE "MaMonAn" = '${MaMonAn}'`;
        await db.query(query);

        await db.none('DELETE FROM "CongThuc" WHERE "MaMonAn" = $1', [MaMonAn]);

        for (let ct of newCongThuc) {
            if (ct.SoLuongThucPham > 0) {
                await db.none('INSERT INTO "CongThuc" ("MaMonAn", "MaThucPham", "SoLuongThucPham") VALUES ($1, $2, $3)', [MaMonAn, ct.MaThucPham, ct.SoLuongThucPham]);
            }
        }
    },

    nhapHoaDon: async (PhuongThuc, SoTien) => {
        const query = `INSERT INTO "HoaDon"("PhuongThuc","SoTien") VALUES ( '${PhuongThuc}', '${SoTien}') RETURNING "MaBanHang"`;
        const result = await db.query(query);
        return result[0].MaBanHang;
    },
    nhapBanHang: async (MaBanHang, MonAn, GiamGia) => {
        const currentDate = new Date();
        const query = `INSERT INTO "BanHang" VALUES ('${MaBanHang}','${MonAn.MaMonAn}','${MonAn.SoLuong}','${currentDate.toISOString()}', '${GiamGia}')`;
        await db.query(query);
    },
    themNhanSu: async (username, password, isadmin, name) => {
        const query = `INSERT INTO "User" VALUES ('${username}','${password}','${isadmin}','${name}') ON CONFLICT ("Username") DO NOTHING`;
        await db.query(query);
    },
    getAllThucPham: async () => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            const data = await dbcn.any(`SELECT * FROM "ThucPham" ORDER BY "MaThucPham" ASC`);
            //return data.map(dbThucPham => new ThucPham(dbThucPham));
            return data;
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
            //return data.map(dbNhanSu => new NhanSu(dbNhanSu));
            return data;
        } catch (error) {
            throw error;
        } finally {
            dbcn.done();
        }
    },
    thongKeDoanhThu: async (Date, type) => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            let query = `
            SELECT
                "MonAn"."MaMonAn",
                "MonAn"."TenMonAn",
                "MonAn"."GiaBan",
                SUM("BanHang"."SoLuong") AS "SoLuongBan",
                SUM("BanHang"."SoLuong" * "MonAn"."GiaBan" * (1 - "BanHang"."MucGiamGia")) AS "TongThanhTien"
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
            //return data.map(dbDoanhThu => new DoanhThu(dbDoanhThu));
            return data;
        } catch (error) {
            throw error;
        } finally {
            dbcn.done();
        }
    },
    nhapThucPham: async (MaThucPham, SoLuongNhap, NgayNhap, GiaNhap) => {
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
    capNhatThucPham: async (listmonan) => {
        for (const monan of listmonan) {
            if (monan.MaMonAn[0] != 'C') {
                try {
                    const data = await db.any(`
                        UPDATE  "ThucPham" SET "SoLuongTrongKho"="SoLuongTrongKho"-$2
                        WHERE  "MaThucPham" = $1 
                    `, [monan.MaMonAn, monan.SoLuong]);
                } catch (error) {
                    console.error(error);
                }
            }
        }

    },
    capNhatChiTieu: async (listmonan) => {
        for (const monan of listmonan) {
            if (monan.MaMonAn[0] == 'C') {
                try {
                    const data = await db.any(`
                        UPDATE  "ChiTieu" SET "SoLuong"="SoLuong"-$2
                        WHERE  "MaMonAn" = $1 AND "Ngay"=$3
                    `, [monan.MaMonAn, monan.SoLuong, new Date()]);
                } catch (error) {
                    console.error(error);
                }
            }
        }

    },
    xuatThucPham: async (MaThucPham, SoLuong) => {
        const updateQuery = `UPDATE "ThucPham" SET "SoLuongTrongKho" = "SoLuongTrongKho" - $1 WHERE "MaThucPham" = $2`;
        const updateValues = [SoLuong, MaThucPham];
        await db.query(updateQuery, updateValues);
    },
    timkiemThucPham: async (Keyword) => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            const data = await dbcn.any(`SELECT * FROM "ThucPham" WHERE "TenThucPham" ILIKE '%${Keyword}%' ORDER BY "MaThucPham" ASC`);
            //return data.map(dbThucPham => new ThucPham(dbThucPham));
            return data;
        } catch (error) {
            throw error;
        } finally {
            dbcn.done();
        }
    },
    themMonAn: async (MaMonAn, TenMonAn, GiaBan, HinhAnh, newCongThuc) => {
        const insertQuery = `INSERT INTO "MonAn" ("MaMonAn", "TenMonAn", "GiaBan", "HanSuDung", "HinhAnh") VALUES ($1, $2, $3, CURRENT_DATE, $4) ON CONFLICT ("MaMonAn") DO NOTHING`;
        const insertValues = [MaMonAn, TenMonAn, GiaBan, HinhAnh];
        await db.none(insertQuery, insertValues);

        if (MaMonAn[0] == 'C') {
            for (let ct of newCongThuc) {
                if (ct.SoLuongThucPham > 0) {
                    const insertCongThucQuery = `INSERT INTO "CongThuc" ("MaMonAn", "MaThucPham", "SoLuongThucPham") VALUES ($1, $2, $3) ON CONFLICT ("MaMonAn", "MaThucPham") DO NOTHING`;
                    const insertCongThucValues = [MaMonAn, ct.MaThucPham, ct.SoLuongThucPham];
                    await db.none(insertCongThucQuery, insertCongThucValues);
                }
            }
        }
    },
    themThucPham: async (MaThucPham, TenThucPham, DonViTinh) => {
        const insertQuery = `INSERT INTO "ThucPham" ("MaThucPham", "TenThucPham", "DonViTinh", "SoLuongTrongKho") VALUES ($1, $2, $3, $4) ON CONFLICT ("MaThucPham") DO NOTHING`;
        const insertValues = [MaThucPham, TenThucPham, DonViTinh, 0];
        await db.none(insertQuery, insertValues);
    },
    nhapChiTieu: async (id, currentDate, portion) => {
        try {
            const checkQuery = `SELECT SUM(CT."SoLuongThucPham" * $1) <= SUM(TP."SoLuongTrongKho") AS check FROM "CongThuc" CT JOIN "ThucPham" TP ON CT."MaThucPham" = TP."MaThucPham" WHERE CT."MaMonAn" = $2 GROUP BY CT."MaThucPham"`;
            const checkValues = [portion, id];
            const checkResult = await db.any(checkQuery, checkValues);

            const check = checkResult.every(result => result.check);
    
            if (check) {
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
        } catch (error) {
            console.error(error);
            return false;
        }
        // const checkQuery = `SELECT SUM(CT."SoLuongThucPham" * $1) <= SUM(TP."SoLuongTrongKho") AS check FROM "CongThuc" CT JOIN "ThucPham" TP ON CT."MaThucPham" = TP."MaThucPham" WHERE CT."MaMonAn" = $2 GROUP BY CT."MaMonAn"`;
        // const checkValues = [portion, id];
        // const checkResult = await db.any(checkQuery, checkValues);

        // if (checkResult[0].check) {
        //     const updateQuery = `UPDATE "ThucPham" TP SET "SoLuongTrongKho" = "SoLuongTrongKho" - CT."SoLuongThucPham" * $1 FROM "CongThuc" CT WHERE CT."MaMonAn" = $2 AND TP."MaThucPham" = CT."MaThucPham"`;
        //     const updateValues = [portion, id];
        //     await db.none(updateQuery, updateValues);

        //     const insertQuery = `INSERT INTO "ChiTieu" ("MaMonAn", "Ngay", "SoLuong") VALUES ($1, $2, $3)`;
        //     const insertValues = [id, currentDate, portion];
        //     await db.none(insertQuery, insertValues);

        //     return true;
        // } else {
        //     return false;
        // }
    },
    checkPortionSet: async (id, currentDate) => {
        const checkQuery = `SELECT EXISTS (SELECT 1 FROM "ChiTieu" WHERE "MaMonAn" = $1 AND "Ngay" = $2)`;
        const checkValues = [id, currentDate];
        const exists = await db.one(checkQuery, checkValues);

        return exists.exists;
    },
    xoaNhanSu: async (username) => {
        const deleteQuery = `DELETE FROM "User" WHERE "Username" = $1 RETURNING *`;
        const deleteValues = [username];
        await db.query(deleteQuery, deleteValues);
    },
    nhapGioLam: async (username, giolam, ngay) => {
        const insertQuery = `INSERT INTO "LamViec" VALUES ($1, $2, $3) `;
        const insertValues = [username, giolam, ngay];
        await db.none(insertQuery, insertValues);
    },
    getLamViec: async (date,type) => {
        let query = `SELECT "User"."Name","User"."Username", SUM("LamViec"."Sogio") AS "SoGioLam", EXTRACT(MONTH FROM "LamViec"."Ngay"::date) AS "Thang",EXTRACT(YEAR FROM "LamViec"."Ngay"::date) AS "Nam"
        FROM "LamViec", "User" WHERE "User"."Username"="LamViec"."Username" AND `;
        if (type === 'month') {
            query += `EXTRACT(MONTH FROM "LamViec"."Ngay"::date) = EXTRACT(MONTH FROM $1::date)
                  AND EXTRACT(YEAR FROM "LamViec"."Ngay"::date) = EXTRACT(YEAR FROM $1::date)`;
        } else if (type === 'year') {
            query += `EXTRACT(YEAR FROM "LamViec"."Ngay"::date) = EXTRACT(YEAR FROM $1::date)`;
        }
        query+=`GROUP BY "User"."Name","User"."Username",EXTRACT(MONTH FROM "LamViec"."Ngay"::date),EXTRACT(YEAR FROM "LamViec"."Ngay"::date)`;
        const data = await db.any(query,[date]);
        console.log(data)
        return data;
    },
    themKhachHang: async (SoDienThoai) => {
        const checkQuery = `SELECT "SoDienThoai" FROM "KhachHang" WHERE "SoDienThoai" = $1`;
        const checkValues = [SoDienThoai];
        const checkResult = await db.query(checkQuery, checkValues);

        if (checkResult.length > 0) {
            return false;
        }
        else {
            const insertQuery = `INSERT INTO "KhachHang" ("SoDienThoai") VALUES ($1)`;
            const insertValues = [SoDienThoai];
            await db.query(insertQuery, insertValues);
            return true;
        }
    },
    getKhachHang: async (SoDienThoai) => {
        const query = `SELECT * FROM "KhachHang" WHERE "SoDienThoai" = $1`;
        const values = [SoDienThoai];
        const result = await db.query(query, values);

        return result.length > 0 ? result[0] : null;
    },
    capNhatKhachHang: async (SoDienThoai, newTichLuy, newGiamGia) => {
        const updateQuery = `UPDATE "KhachHang" SET "TichLuy" = $1, "GiamGia" = $2 WHERE "SoDienThoai" = $3`;
        const updateValues = [newTichLuy, newGiamGia, SoDienThoai];
        await db.query(updateQuery, updateValues);
    },
    thongKeNhap: async (Date, type) => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            let query = `
            SELECT
                "ThucPham"."MaThucPham",
                "ThucPham"."TenThucPham",
                "NhapHang"."GiaNhap",
                "ThucPham"."DonViTinh",
                SUM("NhapHang"."SoLuongNhap") AS "SoLuong",
                SUM("NhapHang"."SoLuongNhap" * "NhapHang"."GiaNhap") AS "ThanhTien"
            FROM
                "NhapHang"
            JOIN
                "ThucPham" ON "NhapHang"."MaThucPham" = "ThucPham"."MaThucPham"
            WHERE
        `;


            if (type === 'date') {
                query += `"NhapHang"."NgayNhap" = $1`;
            } else if (type === 'month') {
                query += `EXTRACT(MONTH FROM "NhapHang"."NgayNhap"::date) = EXTRACT(MONTH FROM $1::date)
                      AND EXTRACT(YEAR FROM "NhapHang"."NgayNhap"::date) = EXTRACT(YEAR FROM $1::date)`;
            } else if (type === 'year') {
                query += `EXTRACT(YEAR FROM "NhapHang"."NgayNhap"::date) = EXTRACT(YEAR FROM $1::date)`;
            }

            query += `
            GROUP BY
                "ThucPham"."MaThucPham", "ThucPham"."TenThucPham", "ThucPham"."DonViTinh","NhapHang"."GiaNhap";
        `;

            const data = await dbcn.any(query, [Date]);
            //return data.map(dbDoanhThu => new DoanhThu(dbDoanhThu));
            return data;
        } catch (error) {
            throw error;
        } finally {
            dbcn.done();
        }
    },
    layKhuyenMai: async () => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            const data = await dbcn.one(`SELECT * FROM "KhuyenMai"`);
            return data;
        } catch (error) {
            throw error;
        } finally {
            dbcn.done();
        }
    },
    capNhatKhuyenMai: async (MocKhuyenMai, GiaTriKhuyenMai, GioiHanKhuyenMai) => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            const updateQuery = `UPDATE "KhuyenMai" SET "MocKhuyenMai" = $1, "GiaTriKhuyenMai" = $2, "GioiHanKhuyenMai" = $3`;
            const updateValues = [MocKhuyenMai, GiaTriKhuyenMai, GioiHanKhuyenMai];
            await dbcn.none(updateQuery, updateValues);
        } catch (error) {
            throw error;
        } finally {
            dbcn.done();
        }
    },
    capNhatGiamGia: async (MocKhuyenMai, GiaTriKhuyenMai, GioiHanKhuyenMai) => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            const updateQuery = `
                UPDATE "KhachHang"
                SET "GiamGia" = LEAST(FLOOR("TichLuy" / $1) * $2, $3)
            `;
            const updateValues = [MocKhuyenMai, GiaTriKhuyenMai, GioiHanKhuyenMai];
            await dbcn.none(updateQuery, updateValues);
        } catch (error) {
            throw error;
        } finally {
            dbcn.done();
        }
    }
}