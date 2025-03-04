const multer = require("multer")
const Model = require("../models/model")
const CrudModel = require('../models/crud-model.js')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: "server/avatars/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({storage})

class FileController {
    async UploadAvatar(req, res) {
        console.log(req.user, req.file)
        const fileName = req.file.filename.substring(0, 255)
        const oldFilename = ((await Model.getByCategory(req.user, 'id', 'users'))).avatar
        const oldFilePath = path.join(__dirname, `../avatars/${oldFilename}`)
        fs.unlink(oldFilePath, (err) => console.log(err))
        // console.log(req.file)
        const request = await CrudModel.update(req.user, {avatar: fileName}, 'users')
        // console.log(request)
        res.json(req.file.filename)
    }
}

module.exports = { upload, fileController: new FileController() }