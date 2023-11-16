import db from "../config/db.js"
import Database_mongo from "../config/config_name.js"


let dang_ky_khach_hang = async (req, res) => {
    try {
        let khach_hang = {
            hotenKH: req.body.hotenKH,
            password: req.body.password,
            email: req.body.email,
            diachi: req.body.diachi,
            sodt: req.body.sodt
        };

        let collection = (await db).db(Database_mongo.database_name).collection(Database_mongo.collection_KhachHang);

        await collection.insertOne(khach_hang);

        // Trả về phản hồi thành công
        res.status(200).send({
            message: 'Đăng ký thành công'
        });
    } catch (err) {
        // Xử lý lỗi và trả về phản hồi lỗi
        console.error(err);
        res.status(500).send({
            message: 'Đăng ký không thành công',
            error: err.message
        });
    }
};

let get_all_khach_hang = async (req, res) => {
    try {
        let collection = (await db).db(Database_mongo.database_name).collection(Database_mongo.collection_KhachHang);
        let allKhachHang = await collection.find({}).toArray();
        return res.status(200).json({
            ds: allKhachHang
        })
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}


export const APIControllers = {
    dang_ky_khach_hang, get_all_khach_hang
}