const multer = require("multer");
const path = require("path");

const dest = process.env.ENV == "prod" ? "/tmp/uploads" : path.join(__dirname, "..", "..", "/public/uploads/");
const multerConfig = multer({ 
    dest,
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, dest);
        },
        filename: function (req, file, cb) {
            // Customize filename if needed, such as adding a timestamp or unique identifier
            cb(null, file.originalname);
        }
    }),
});

module.exports = multerConfig;