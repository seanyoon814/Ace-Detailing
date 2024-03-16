const express = require("express");
const { ObjectId } = require("mongoose").Types;

const logger = require("../utils/logger");
const multerConfig = require("../config/multer");
const Report = require("../models/Report");
const { uploadImage } = require("../utils/cloudStorageHelper");

const router = express.Router();

// todo: use query params to specify user/vehicle id
router.get("/", async (req, res, next) => {
    logger.info("Reading all documents from collection 'reports'.");

    try {
        const documents = await Report.find();
        res.status(200).send(documents);
    }
    catch (err) {
        logger.error(err.message);
        res.status(503).send(err);
    }
});

router.post("/", multerConfig.array("images"), async (req, res, next) => {
    const imageUrls = !req.files ? [] : await Promise.all(req.files.map(file => uploadImage(file)));
    const document = new Report({
        ...req.body,
        imageUrls
    });

    try {
        await document.save();
        res.status(201).send(document);
    }
    catch (err) {
        logger.error(err.message);
        res.status(400).send(err);
    }
});

router.get("/:id", async (req, res, next) => {
    const { id } = req.params;

    try {
        const document = await Report.findById(id);
        res.status(200).send(document);
    }
    catch (err) {
        logger.error(err.message);
        res.status(400).send(err);
    }
});

module.exports = router;