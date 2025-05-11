import express from 'express'
import multer from 'multer';
import { Queue } from 'bullmq';

const queue = new Queue('file-upload-queue', {
    connection: {
        host: 'localhost',
        port: 6379
    }
});


// multer file handling 
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
    queue.add('file-ready', JSON.stringify({
        filename: req.file?.originalname,
        source: req.file?.destination,
        path: req.file?.path,
    }))
    res.json({ message: "uploaded" });
})