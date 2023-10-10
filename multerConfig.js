
const multer = require('multer');

export const storege = multer.diskStorage({
    destination: (require, file, callback) => {
        callback(null, path.resolve("uploads"));
    },
    filename: (require, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname);
    }
});