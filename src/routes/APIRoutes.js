import express from "express";
import { APIControllers } from '../controllers/APIControllers.js'
let router = express.Router();

const initAPIRoutes = (app) => {
    router.get('/get_all_khach_hang', APIControllers.get_all_khach_hang)
    router.put('/thay_doi_thong_tin_khach_hang', APIControllers.thay_doi_thong_tin_khach_hang)
    router.get('/thong_tin_mot_khach_hang/:_id', APIControllers.thong_tin_mot_khach_hang)
    router.delete('/xoa_khach_hang/:_id', APIControllers.xoa_khach_hang)
    router.post('/dang_nhap_khach_hang', APIControllers.dang_nhap_khach_hang)

    router.get('/get_all_nhan_vien', APIControllers.get_all_nhan_vien)
    router.put('/thay_doi_thong_tin_nhan_vien', APIControllers.thay_doi_thong_tin_nhan_vien)
    router.get('/thong_tin_mot_nhan_vien/:_id', APIControllers.thong_tin_mot_nhan_vien)
    router.delete('/xoa_nhan_vien/:_id', APIControllers.xoa_nhan_vien)

    return app.use("/api", router)
}

export default initAPIRoutes;