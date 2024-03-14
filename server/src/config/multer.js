const multer = require("multer");
const path = require("path");

const multerConfig = multer({
    dest: path.join(__dirname, "..", "..", "/public/uploads/"),
});

module.exports = multerConfig;