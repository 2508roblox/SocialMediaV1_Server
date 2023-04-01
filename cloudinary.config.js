// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import multer from 'multer';

// cloudinary.config({
//     cloud_name: 'dx0ehgjnl',
//     api_key: '338146826378699',
//     api_secret: 'vTTRQXItph8hduwxA_GQjIFW1UA'
// });

// const storage = new CloudinaryStorage({
//     cloudinary,
//     allowedFormats: ['jpg', 'png'],
//     filename: function (req, file, cb) {
//         cb(null, req.body.fileName || file.originalname);
//     }
// });
// const uploadCloud = multer({ storage });
// export default uploadCloud;