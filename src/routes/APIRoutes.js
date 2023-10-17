import express from "express";
import APIControllers from '../controllers/APIControllers'
let router = express.Router();

const initAPIRoutes = (app) => {
    router.get('/home', APIControllers.home)

    return app.use("/api/v1/", router)
}

// module.exports = {
//     initAPIRoutes
// }

export default initAPIRoutes;