const express = require("express");
const cors = require("cors");
const verifyJWT = require("../utils/verifyJWT");
const bodyParser = require("body-parser");
const router = express.Router();
const User = require("../models/UserClass");
const { apiUrl, clientUrl } = require("../utils/constants");

var mongoose = require("mongoose");
const logger = require("../utils/logger");

router.use(bodyParser.urlencoded({extended : true}));

router.use(cors({ origin : clientUrl, credentials : true }));
// router.use(session({ name : "userSession", secret : "secret_string", resave : false, saveUninitialized : false, maxAge : 60 * 60* 1000 }))

router.post("/register", async (req, res) => {

    var id = await generateUserId();
    var user = new User(id, req.body.name, req.body.email, req.body.password);
    user.save();
    res.status(204).send();
    
})

router.get("/api/checkName/:name", async (req, res) => {
    const { name } = req.params;
    const taken = await User.checkName(name);
    res.json({ taken });
})

router.get("/api/checkEmail/:email", async (req, res) => {
    const { email } = req.params;
    const taken = await User.checkEmail(email);
    res.json({ taken });
})

router.get("/api/check", verifyJWT, async (req, res) => {
    res.send(req.admin);
})

router.get("/", async (req, res, next) => {
    logger.info("Reading all documents from collection 'users'.");

    try {
        const documents = await User.find();
        res.status(200).send(documents);
    }
    catch (err) {
        logger.error(err.message);
        res.status(503).send(err);
    }
});

async function generateUserId() {
    const collectionName = "userCounter";
    const collection = mongoose.connection.collection(collectionName);
    var doc;
    while (doc == null) {
        doc = await collection.findOneAndUpdate({}, { $set : { key : 0 } }, { upsert : true, new : true});
    }
    var id = doc.key + 1;
    collection.updateOne({}, { $set : { key : id}});
    return id;
}

module.exports = router;