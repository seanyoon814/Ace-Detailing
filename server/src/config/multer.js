const multer = require("multer");
const path = require("path");
const fs = require("fs");

let dest = path.join(__dirname, "..", "..", "/public/uploads/");

if (process.env.ENV === "prod") {
    dest = "/tmp/uploads";
    fs.mkdirSync(dest);
}

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
