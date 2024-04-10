const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const logger = require("../utils/logger");

router.get("/vehicles", async (req, res) => {
    logger.info("Reading all documents from collection 'notifications'.");

    try {
        const documents = await Notification.find({ type : "Vehicle" });
        res.status(200).send(documents);
    }
    catch (err) {
        logger.error(err.message);
        res.status(503).send(err);
    }
})

router.get("/reports", async (req, res) => {
    logger.info("Reading all documents from collection 'notifications'.");

    try {
        const documents = await Notification.find({ type : "Report" });
        res.status(200).send(documents);
    }
    catch (err) {
        logger.error(err.message);
        res.status(503).send(err);
    }
})

module.exports = router;