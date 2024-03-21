const multer = require("multer");
const path = require("path");

const dest = process.env.ENV == "prod" ? "/tmp/uploads" : path.join(__dirname, "..", "..", "/public/uploads/");
const multerConfig = multer({ dest });

module.exports = multerConfig;