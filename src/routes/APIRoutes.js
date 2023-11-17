import express from "express";
import { APIControllers } from '../controllers/APIControllers.js'
let router = express.Router();
import db from "../config/db.js"
import multer from "multer";
import Database_mongo from "../config/config_name.js";
import 'dotenv/config'
import authenticateToken from "../middlewares/jwt.js"

const initAPIRoutes = (app) => {
    router.get('/get_all_khach_hang', authenticateToken, APIControllers.get_all_khach_hang)
    router.put('/thay_doi_thong_tin_khach_hang', authenticateToken, APIControllers.thay_doi_thong_tin_khach_hang)
    router.get('/thong_tin_mot_khach_hang/:_id', APIControllers.thong_tin_mot_khach_hang)
    router.delete('/xoa_khach_hang/:_id', APIControllers.xoa_khach_hang)
    router.post('/dang_ky_khach_hang', APIControllers.dang_ky_khach_hang)
    router.post('/dang_nhap_khach_hang', APIControllers.dang_nhap_khach_hang)

    router.post('/dang_ky_nhan_vien', APIControllers.dang_ky_nhan_vien)
    router.get('/get_all_nhan_vien', APIControllers.get_all_nhan_vien)
    router.put('/thay_doi_thong_tin_nhan_vien', APIControllers.thay_doi_thong_tin_nhan_vien)
    router.get('/thong_tin_mot_nhan_vien/:_id', APIControllers.thong_tin_mot_nhan_vien)
    router.delete('/xoa_nhan_vien/:_id', APIControllers.xoa_nhan_vien)

    router.get('/get_all_san_pham', APIControllers.get_all_san_pham)
    let filename = ""


    const storage = multer.diskStorage({
        destination: './src/public/images',
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const originalName = file.originalname;
            const extension = originalName.split('.').pop();
            cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
            filename = file.fieldname + '-' + uniqueSuffix + '.' + extension;
        }
    });

    const upload = multer({ storage: storage });

    router.post('/uploadfile', upload.array('images', 5), async (req, res) => {
        let { TenHH, MoTaHH, Gia, SoLuongHang, GhiChu } = req.body;

        let san_pham = {
            TenHH: TenHH,
            MoTaHH: MoTaHH,
            Gia: Gia,
            SoLuongHang: SoLuongHang,
            GhiChu: GhiChu,
        };

        let collectionSanPham = (await db).db(Database_mongo.database_name).collection(Database_mongo.collection_SanPham);
        let collectionImages = (await db).db(Database_mongo.database_name).collection(Database_mongo.collection_HinhAnhSanPham);

        try {
            // Thêm sản phẩm vào CSDL
            const result = await collectionSanPham.insertOne(san_pham);

            // Lấy ID sản phẩm vừa được thêm vào
            const insertedProductId = result.insertedId;

            // Lưu thông tin hình ảnh vào collection 'images' với id_sanpham tương ứng
            req.files.forEach(async (file) => {
                const imagePath = file.path; // Đường dẫn tới hình ảnh đã upload
                const imageName = file.filename; // Tên file hình ảnh

                await collectionImages.insertOne({
                    ten_anh: imageName,
                    id_sanpham: insertedProductId,
                    path: imagePath // Đường dẫn tới hình ảnh
                });
            });

            res.status(200).json({ message: 'Upload sản phẩm thành công' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi server' });
        }
    });



    return app.use("/api", router)
}

export default initAPIRoutes;