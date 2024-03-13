const mongoose = require('mongoose');

const logger = require("../utils/logger");

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const uri = `mongodb+srv://${username}:${password}@ace-detailing.sc1kbvv.mongodb.net/?retryWrites=true&w=majority&appName=ace-detailing`;

async function initConnection() {
    try {
        logger.info("Connecting to MongoDB cluster.");
        let client = await mongoose.connect(uri);
        return client;
    }
    catch (err) {
        logger.error(err);
    }
};

async function update(document, object) {
    let client = initConnection();
    let db = client.db("cmpt372");
    const docs = db.collection(document);
    const res = await docs.updateOne(object);

    const cursor = docs.find();
    for await (const d of cursor) {
        console.log(d);
    }

    client.close();
    process.exit();
}

module.exports = {
    initConnection,
    update
};