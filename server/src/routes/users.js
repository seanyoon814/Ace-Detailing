const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const User = require("../models/User");

router.use(bodyParser.urlencoded({extended : true}));

router.get("/register", (req, res) => {
    res.redirect("http://localhost:3000/user/register");
})

router.post("/register", (req, res) => {
    // TODO: count user id
    // TODO: confirm email address
    // var id = generateUserId();
    // var user = new User(id, req.body.email, req.body.password);
    // user.save();
    res.send(req.body);
})

router.get("/login", (req, res) => {
    res.send("login");
})

function generateUserId() {
    // TODO:
}

module.exports = router;