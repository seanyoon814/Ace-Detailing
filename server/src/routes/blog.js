const express = require("express");
const { ObjectId } = require("mongoose").Types;

const logger = require("../utils/logger");
const multerConfig = require("../config/multer");
const AdminBlog = require("../models/AdminBlog");
const { uploadImage } = require("../utils/cloudStorageHelper");
const verifyJWT = require("../utils/verifyJWT");
const router = express.Router();

router.get("/", async (req, res, next) => {
    logger.info("Reading all documents from collection 'blog'.");
    AdminBlog.find().then((documents) => {
        res.status(200).send(documents);
    }).catch((err) => {
        logger.error(err.message);
        res.status(503).send(err);
    });
});

router.post("/",verifyJWT, multerConfig.single("image"), async (req, res) => {
    try {
        console.log(req.file)
        console.log(req.body)
        const imageUrl = req.file ? await uploadImage(req.file) : null;
        const document = new AdminBlog({
            ...req.body,
            imageUrl
        });
        await document.save();
        res.status(201).send(document);
    } catch (err) {
        logger.error(err.message);
        res.status(400).send(err);
    }
});
//TESTING FUNCTION
router.get('/delete', async (req, res) => {
    try {
        // Use deleteMany to delete all entries from the AdminBlog collection
        const result = await AdminBlog.deleteMany({});
        // Check the result object to see the number of documents deleted
        console.log(`${result.deletedCount} documents deleted`);
        res.status(200).send('All entries deleted successfully');
    } catch (err) {
        console.error('Error deleting entries:', err);
        res.status(500).send('Error deleting entries');
    }
});

module.exports = router;