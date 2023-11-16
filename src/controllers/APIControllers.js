import db from "../config/db.js"


let home = async (req, res) => {
    db
    return res.status(200).json({
        "msg": "ok"
    })
}

let dang_ky_khach_hang = async (req, res) => {
    try {
        let khach_hang = {
            hoten_kh: req.body.hotenKH,
            matkhau: req.body.password,
            email: req.body.email,
            diachi: req.body.diachi,
            sdt: req.body.sodt
        };

        let collection = (await db).db('pt_web_backend').collection('KhachHang');

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


export const APIControllers = {
    home, dang_ky_khach_hang
}