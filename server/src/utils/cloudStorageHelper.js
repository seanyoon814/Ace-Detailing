const fs = require("fs");

const { storage } = require("../services/cloudStorage");
const logger = require("./logger");
const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME);

async function uploadImage(file) {
    const { filename, originalname, path } = file;
    console.log("uploadImage function called");
    console.log("Received file:", file);
    logger.log("Received file:", file);
    const blob = bucket.file(`${filename}.${originalname.split(".")[1]}`);

    return new Promise((resolve, reject) => {
        fs.createReadStream(path)
            .pipe(blob.createWriteStream())
            .on('error', function(err) {
                logger.error(err);
                reject(err);
            })
            .on('finish', function() {
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                logger.debug("publicUrl: %s", publicUrl);
                resolve(publicUrl);
            })
    });
}

module.exports = {
    uploadImage
};