const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const User = require("../models/User");
var mongoose = require("mongoose");

router.use(bodyParser.urlencoded({extended : true}));

router.post("/register", async (req, res) => {
    // TODO: confirm email address
    // TODO: check duplicated name and email

    var id = await generateUserId();
    var user = new User(id, req.body.name, req.body.email, req.body.password);
    user.save();
    res.send("success");
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

async function generateUserId() {
    const collectionName = "userCounter";
    const collection = mongoose.connection.collection(collectionName);
    var doc = await collection.findOne({});
    var id = doc.key + 1;
    collection.updateOne({}, { $set : { key : id}});
    return id;
}

module.exports = router;