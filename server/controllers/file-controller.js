const multer = require("multer")
const model = require("../services/model")

const storage = multer.diskStorage({
    destination: "server/avatars/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({storage})

class FileController {
    async UploadAvatar(req, res) {
        const filename = req.file.filename.substring(0, 255)
        const oldFilename = ((await model.getByCategory(req.user, 'id', 'users')).rows[0]).avatar
        console.log(oldFilename)
        const request = await model.update(req.user, {avatar: filename}, 'users')
        res.json(req.file.filename)
    }
}

module.exports = { upload, fileController: new FileController() }