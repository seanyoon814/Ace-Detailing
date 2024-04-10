const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const fileUpload = require('express-fileupload');
require('dotenv').config(); // env variables
require("./services/mongodb").initConnection(); // init before server start
require("./services/cloudStorage").testConnection(); // init before server start

const logger = require("./utils/logger");

const usersRoutes = require("./routes/users");
const reportsRoutes = require("./routes/reports");
const vehiclesRoutes = require("./routes/vehicles");
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");
const checkRoutes = require("./routes/check");
const notificationRoutes = require("./routes/notifications");

const app = express();
const port = process.env.ENV == "prod" ? 8080 : 5000;

// middleware
app.use(cors(
    {
        origin: (origin, callback)=>{
            
            if ('http://localhost:3000' !== -1 ||  'https://ace-detailing.uw.r.appspot.com/' != -1 ){
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }

        } ,
        credentials: true,
        optionsSuccessStatus: 200
    }
));
app.use(express.json());
app.use(cookieParser());
const verifyJWT = require("./utils/verifyJWT");

// routes
app.use("/user", verifyJWT, usersRoutes);
app.use("/reports", verifyJWT, reportsRoutes);
app.use("/vehicles",verifyJWT, vehiclesRoutes);
app.use("/blog", blogRoutes); // Only post is protected with verifyJWT
app.use("/check", verifyJWT, checkRoutes)
app.use("/auth", authRoutes);
app.use("/notifications", notificationRoutes);

app.listen(port, async () => {
    logger.info(`Server is running on port ${port}.`);  
});