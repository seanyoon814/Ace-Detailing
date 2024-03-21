const logger = require('../utils/logger');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
});

async function testConnection() {
    logger.info("Testing Cloud Storage connection.");

    try {
        await storage.getBuckets();
        logger.info("Cloud Storage connection confirmed.");
    }
    catch (err) {
        logger.error("Application default credentials failed.");
    }
}

module.exports = {
    storage,
    testConnection
};