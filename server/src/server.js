const cors = require('cors');
const express = require('express');

require('dotenv').config(); // env variables
require("./services/mongodb").initConnection() // init before server start

const logger = require("./utils/logger");

const usersRoutes = require("./routes/users");
const reportsRoutes = require("./routes/reports");
const vehiclesRoutes = require("./routes/vehicles");
const authRoutes = require("./routes/auth");

const { default: mongoose } = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/user", usersRoutes);
app.use("/reports", reportsRoutes);
app.use("/vehicles", vehiclesRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
    logger.info(`Server is running on port ${port}.`);
});