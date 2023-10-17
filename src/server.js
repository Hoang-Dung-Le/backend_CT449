import express from "express";
import 'dotenv/config'
import initAPIRoutes from "./routes/APIRoutes";

const app = express();

const port = process.env.PORT;

initAPIRoutes(app); // gọi hàm này để khởi tạo các routes 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})