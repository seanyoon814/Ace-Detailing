// For Express, sessions and DB
const express = require("express");
const expressSession = require("express-session");
const router = express.Router();
var mongoose = require("mongoose");
const path = require("path");

// For Auth Controller
const asyncHandler = require("express-async-handler");

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended : true}));

router.post('/checkToken', asyncHandler(
    async (req, res) => {
        const token = req.body;
        if(!token){
            return res.status(401).json({message: "Token is Invalid"});
        }
        return res.status(200).json({message: "Token is valid"});    
    }
));



module.exports = router;