const express = require("express");
const { ObjectId } = require("mongoose").Types;

const logger = require("../utils/logger");
const multerConfig = require("../config/multer");
const Vehicle = require("../models/Vehicle");
const { uploadImage } = require("../utils/cloudStorageHelper");

const router = express.Router();

router.get("/", async (req, res, next) => {
    logger.info("Retrieving all vehicles.");

    try {
        const documents = await Vehicle.find();
        res.status(200).send(documents);
    }
    catch (err) {
        logger.error(err.message);
        res.status(503).send(err);
    }
});

router.post("/", multerConfig.array("images"), async (req, res, next) => {
    const imageUrls = await Promise.all(req.files.map(file => uploadImage(file)));
    const document = new Vehicle({
        ...req.body,
        imageUrls
    });

    logger.info("Inserting new vehicle %O.", document);

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

    logger.info("Querying for vehicle with id '%s'.", id);

    try {
        const document = await Vehicle.findById(id);
        res.status(200).send(document);
    }
    catch (err) {
        logger.error(err.message);
        res.status(400).send(err);
    }
});

router.post("/:id", async (req, res, next) => {
    const { id } = req.params;
    const filter = { _id: new ObjectId(id) };
    const update = req.body;
    
    logger.info("Updating vehicle with id '%s'.", id);

    try {
        const document = await Vehicle.findOneAndUpdate(filter, update);
        res.status(201).send(document);
    }
    catch (err) {
        logger.error(err.message);
        res.status(400).send(err);
    }
});

module.exports = router;