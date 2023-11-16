import express from "express";
import 'dotenv/config'
import initAPIRoutes from "./routes/APIRoutes.js";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const port = process.env.PORT;

initAPIRoutes(app); // gọi hàm này để khởi tạo các routes 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})