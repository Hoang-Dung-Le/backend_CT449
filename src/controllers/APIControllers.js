import db from "../config/db.js"
import Database_mongo from "../config/config_name.js"
import { ObjectId } from "mongodb";


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

let thay_doi_thong_tin_khach_hang = async (req, res) => {
    try {
        let { _id, hotenKH, email, diachi, sodt } = req.body;
        console.log("íisisisi", _id)
        // Kiểm tra xem có thiếu thông tin cần thiết không
        if (!_id || !hotenKH || !email || !diachi || !sodt) {
            return res.status(400).json({ message: "Thiếu thông tin cần thiết" });
        }

        // Kết nối tới database và collection
        const collection = (await db).db(Database_mongo.database_name).collection(Database_mongo.collection_KhachHang);

        const objectId = new ObjectId(_id);

        // Cập nhật thông tin khách hàng
        const result = await collection.updateOne(
            { _id: objectId }, // Điều kiện tìm kiếm theo _id
            { $set: { hotenKH: hotenKH, email: email, diachi: diachi, sodt: sodt } } // Thông tin cần cập nhật
        );

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Lỗi server khi cập nhật thông tin khách hàng" });
    }
}

let thong_tin_mot_khach_hang = async (req, res) => {
    try {
        let _id = req.params._id;
        // let _id = req.body._id;
        console.log(_id)

        // Kiểm tra xem _id có tồn tại không
        if (!_id) {
            return res.status(400).json({ message: "Thiếu thông tin _id của khách hàng" });
        }

        const objectId = new ObjectId(_id);

        // Kết nối tới database và collection
        const collection = (await db).db(Database_mongo.database_name).collection(Database_mongo.collection_KhachHang);

        // Tìm kiếm thông tin của khách hàng theo _id
        const khachHang = await collection.findOne({ _id: objectId });

        console.log(khachHang)

        if (khachHang) {
            return res.status(200).json(khachHang);
        } else {
            return res.status(404).json({ message: "Không tìm thấy thông tin của khách hàng" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Lỗi server khi lấy thông tin khách hàng" });
    }
}

let xoa_khach_hang = async (req, res) => {
    try {
        let _id = req.params._id;
        // Kiểm tra xem _id có tồn tại không
        if (!_id) {
            return res.status(400).json({ message: "Thiếu thông tin _id của khách hàng" });
        }

        const objectId = new ObjectId(_id);

        // Kết nối tới database và collection
        const collection = (await db).db(Database_mongo.database_name).collection(Database_mongo.collection_KhachHang);

        // Xóa khách hàng dựa vào _id
        const result = await collection.deleteOne({ _id: objectId });

        if (result.deletedCount > 0) {
            return res.status(200).json({ message: "Xóa khách hàng thành công" });
        } else {
            return res.status(404).json({ message: "Không tìm thấy khách hàng để xóa" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Lỗi server khi xóa khách hàng" });
    }
}

let dang_nhap_khach_hang = async (req, res) => {
    try {
        let { email, password } = req.body;

        // Kiểm tra xem có thiếu thông tin đăng nhập không
        if (!email || !password) {
            return res.status(400).json({ message: "Vui lòng cung cấp email và mật khẩu" });
        }

        // Kết nối tới database và collection chứa thông tin khách hàng
        const collection = (await db).db(Database_mongo.database_name).collection(Database_mongo.collection_KhachHang);

        // Tìm kiếm thông tin khách hàng với email và mật khẩu cung cấp
        const khachHang = await collection.findOne({ email: email, password: password });

        if (khachHang) {
            // Nếu thông tin đăng nhập chính xác, trả về thông tin khách hàng
            return res.status(200).json(khachHang);
        } else {
            return res.status(401).json({ message: "Email hoặc mật khẩu không chính xác" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Lỗi server khi đăng nhập" });
    }
}


export const APIControllers = {
    dang_ky_khach_hang, get_all_khach_hang, thay_doi_thong_tin_khach_hang,
    thong_tin_mot_khach_hang, xoa_khach_hang, dang_nhap_khach_hang
}