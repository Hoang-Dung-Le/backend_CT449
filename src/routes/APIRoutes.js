import express from "express";
import { APIControllers } from '../controllers/APIControllers.js'
let router = express.Router();

const initAPIRoutes = (app) => {
    router.get('/home', APIControllers.home)
    router.post('/dang_ky_khach_hang', APIControllers.dang_ky_khach_hang)
    return app.use("/api", router)
}

// module.exports = {
//     initAPIRoutes
// }

export default initAPIRoutes;