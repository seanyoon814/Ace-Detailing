const path = require('path');
const { Storage } = require('@google-cloud/storage');

 // todo: use application default credentials
const serviceKey = path.join(__dirname, "..", "..", "./keys.json");

const cloudStorage = new Storage({
  keyFilename: serviceKey,
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
})

module.exports = cloudStorage;