import express from 'express'
import multer from 'multer';

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
})

const upload = multer({ storage: fileStorage })


export const uploadRouter = express.Router();

uploadRouter.post('/pdf', upload.single('pdf'), (req, res) => {
    res.json({ message: "uploaded" });
})