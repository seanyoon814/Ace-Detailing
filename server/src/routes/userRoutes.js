const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const User = require("./models/User");

router.use(bodyParser.urlencoded({extended : true}));

router.get("/user/register", (req, res) => {
    // TODO: redierect to user register page
    res.send("register");
})

router.post("/user/register", (req, res) => {
    // TODO: count user id
    // TODO: confirm email address
    var id = generateUserId();
    var user = new User(id, req.body.email, req.body.password);
    user.save();
})

router.get("/user/login", (req, res) => {
    res.send("login");
})

function generateUserId() {
    // TODO
}

module.exports = router;