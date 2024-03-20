// For Express, sessions and DB
const express = require("express");
const expressSession = require("express-session");
const router = express.Router();
var mongoose = require("mongoose");
const path = require("path");


// For Auth Controller
const User = require("../models/User"); // using user model
const loginLimiter = require("../utils/loginLimiter"); // For login
const jwt = require("jsonwebtoken"); // token
const bcrypt = require("bcrypt"); // To decrypt token
const asyncHandler = require("express-async-handler");

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended : true}));
// route.use(session({
//     name: "session",
//     secret: "secret-string",
//     resave: false,
//     saveUninitialized: false,
//     maxAge: 1000 * 60 * 60 * 2 // 2 hour session, 
// }));

// Helper Functions 
// login for post /auth
const login = asyncHandler(async (req, res) => {
    
});

// refresh for get /auth/refresh when access token is expired
const refresh = asyncHandler(async (req, res) => {

});

// logout for post /auth/logout, delete cookies
const logout = asyncHandler(async (req, res) => {

});

// router.post('/login', loginLimiter, login);
// router.get('/refresh', refresh);
// router.post('/logout', logout);
router.get("/", async (req, res) => {
    // Init collection
    const collectionName = "users";
    const collection = mongoose.connection.collection(collectionName);
    
    // get user data
    // const {email, password} = req.body;
    // For testing
    const email = "Admin@Admin.com";
    const password = "pwd";

    var db = mongoose.connection;
    try{
        const query = {email: email, password: password};
        // find email and password
        const items = await collection.find(query).toArray();
        console.log("await User.find() : ", items);
        console.log(items[0].name);
        res.send("login sucess"); // TODO: send token
    }
    catch(err){
        console.log(err);
        res.send("error");
    }
});


router.get("/login/refresh", async (req, res, next) => {
    
});

router.post('/logout', async(req, res, next) => {
    // req.session.destroy();
    res.redirect('/login');
});



module.exports = router;