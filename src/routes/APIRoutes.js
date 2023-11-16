import express from "express";
import { APIControllers } from '../controllers/APIControllers.js'
let router = express.Router();

const initAPIRoutes = (app) => {
    router.post('/dang_ky_khach_hang', APIControllers.dang_ky_khach_hang)
    router.get('/get_all_khach_hang', APIControllers.get_all_khach_hang)
    return app.use("/api", router)
}

export default initAPIRoutes;