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
const bcrypt = require("bcrypt"); // TODO: To decrypt password 
const asyncHandler = require("express-async-handler");

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended : true}));

/*
    id: 1,
    name: 'Admin',
    email: 'Admin@Admin.com',
    password: 'pwd',
    admin: true,
*/

// Helper Functions 
// login for post /auth
const login = asyncHandler(async (req, res) => {
    // Init collection
    const collectionName = "users";
    const collection = mongoose.connection.collection(collectionName);
    
    // get user data
    const {email, password} = req.body;
    
    if(email === undefined || password === undefined){
        return res.status(400).send("email or password is not defined");
    }
    
    // find email and password
    const query = {email: email};
    const foundUser = await collection.findOne(query);
    // console.log("await User.find() : ", foundUser);

    //  Authentication process: TODO decrypt password if encryption added
    if(foundUser.password != password){
        return res.status(401).json({message:"Unauthorized Password does not match"});
    }

    // Adding tokens and http cookie
    const accessToken = jwt.sign(
        {   
            "UserInfo":{
                "id": foundUser.id,
                "name": foundUser.name,
                "email": foundUser.email,
                "password": foundUser.password,
                "admin": foundUser.admin
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "60s"}
    );
    
    const refreshToken = jwt.sign(
        {
            "id": foundUser.id,
            "name": foundUser.name,
            "email": foundUser.email,
            "admin": foundUser.admin
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d"}
    );
    
    // cookie for refresh token
    res.cookie('jwt', refreshToken, {
        httpOnly:true, 
        secure: true, 
        sameSite: 'None',
        maxAge: 1000 * 60 * 60 * 24 * 1 // 1 day cookie before expiration
    });

    // send accessToken
    res.json({accessToken: accessToken});
});

router.post('/', loginLimiter, login);

// refresh for get /auth/refresh when access token is expired
const refresh = (req, res) => {
    const cookies = req.cookies;
    // Check if cookie is a jwt token
    if( !cookies?.jwt ){
        return res.status(401).json({error: "Unauthorized cookie not JWT"});
    }
    const refreshToken = cookies.jwt
    // Verify cookie with JWT
    jwt.verify(
        refreshToken, 
        process.env.REFRESH_TOKEN_SECRET, 
        asyncHandler(async (err, user) => {
            if(err){
                return res.sendStatus(401).json({message: "Forbidden"});
            }
            // Check if user exists
            // console.log("user: ", user)
            const collectionName = "users";
            const foundUser = await mongoose.connection.collection(collectionName).findOne({email: user.email});
            // console.log(foundUser);
            if(!foundUser){
                return res.sendStatus(401).json({error: "Unauthorized User not found"});
            }

            const accessToken = jwt.sign(
                {   
                    "UserInfo":{
                        "id": foundUser.id,
                        "name": foundUser.name,
                        "email": foundUser.email,
                        "admin": foundUser.admin
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: "60s"}
            );
            res.json({accessToken});
        }
    ));
};

router.get('/refresh', refresh);

// logout for post /auth/logout, delete cookies
const logout = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt){
        return res.sendStatus(400).json({error: "Bad Request"});
    }
    res.clearCookie('jwt', {
        httpOnly:true, 
        secure: true, 
        sameSite: 'None',
    });

    res.json({message: "Logged out, cookies cleared"});
});

router.post('/logout', logout);

module.exports = router;