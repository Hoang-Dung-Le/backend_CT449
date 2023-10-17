import db from "../config/db"


let home = async (req, res) => {
    return res.status(200).json({
        "msg": "ok"
    })
}

module.exports = { home }