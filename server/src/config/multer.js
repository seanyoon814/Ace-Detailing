const multer = require("multer");
const path = require("path");

const dest = process.env.ENV == "prod" ? "/tmp/uploads" : path.join(__dirname, "..", "..", "/public/uploads/");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dest);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const multerConfig = multer({ 
    storage: storage
});

module.exports = multerConfig;
