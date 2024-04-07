const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();
const User = require("../models/UserClass");
const { apiUrl, clientUrl } = require("../utils/constants");

var mongoose = require("mongoose");

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

router.post("/api/check", async (req, res) => {
    var user = await User.findByLogin(req.body.email, req.body.password);
    if (user) {
        res.json({ admin : user.admin });
    }
    else {
        res.json({ admin : undefined });
    }
})

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