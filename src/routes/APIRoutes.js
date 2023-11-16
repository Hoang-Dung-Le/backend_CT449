import express from "express";
import { APIControllers } from '../controllers/APIControllers.js'
let router = express.Router();

const initAPIRoutes = (app) => {
    router.get('/get_all_khach_hang', APIControllers.get_all_khach_hang)
    router.put('/thay_doi_thong_tin_khach_hang', APIControllers.thay_doi_thong_tin_khach_hang)
    router.get('/thong_tin_mot_khach_hang/:_id', APIControllers.thong_tin_mot_khach_hang)
    router.delete('/xoa_khach_hang', APIControllers.xoa_khach_hang)
    router.post('/dang_nhap_khach_hang', APIControllers.dang_nhap_khach_hang)
    return app.use("/api", router)
}

export default initAPIRoutes;