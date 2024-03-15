const mongoose = require('mongoose');

const logger = require("../utils/logger");

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const uri = `mongodb+srv://${username}:${password}@cluster.cdbm9yi.mongodb.net/?retryWrites=true&w=majority&appName=cluster/test`;

async function initConnection() {
    try {
        logger.info("Connecting to MongoDB cluster.");
        await mongoose.connect(uri);
    }
    catch (err) {
        logger.error(err);
    }
};

module.exports = {
    initConnection,
};