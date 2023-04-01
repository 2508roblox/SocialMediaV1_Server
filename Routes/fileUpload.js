import express from 'express'
import multer from 'multer'
var router = express.Router()


// cấu hình multer để lưu trữ file ảnh tải lên từ client
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads'); // lưu trữ file tải lên vào thư mục 'uploads/'
    },
    filename: function (req, file, cb) {
        cb(null, req.body.fileName + '.png'); // đặt tên file là 'fileName-timestamp.jpg'
    }
});

const upload = multer({ storage: storage });
router.post('/upload', upload.single('image'), function (req, res) {
    res.send('File đã được tải lên thành công.');
})
export default router
// định nghĩa route để xử lý yêu cầu upload file ảnh từ client