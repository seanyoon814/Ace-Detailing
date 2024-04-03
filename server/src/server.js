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

const app = express();
const port = process.env.ENV == "prod" ? 8080 : 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
// routes
app.use("/user", usersRoutes);
app.use("/reports", reportsRoutes);
app.use("/vehicles", vehiclesRoutes);
app.use("/auth", authRoutes);
app.use("/blog", blogRoutes);

app.listen(port, async () => {
    logger.info(`Server is running on port ${port}.`);  
});