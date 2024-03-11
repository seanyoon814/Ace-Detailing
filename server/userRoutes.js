const express = require("express");
const router = express.Router();

router.get("/user/register", (req, res) => {
    res.send("register");
})

router.get("/user/login", (req, res) => {
    res.send("login");
})

module.exports = router;