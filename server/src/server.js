const cors = require('cors');
const express = require('express');

require('dotenv').config(); // env variables
require("./services/mongodb").initConnection() // init before server start

const logger = require("./utils/logger");

const usersRoutes = require("./routes/users");
const vehiclesRoutes = require("./routes/vehicles");

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/user", usersRoutes);
app.use("/vehicles", vehiclesRoutes);

app.listen(port, () => {
    logger.info(`Server is running on port ${port}.`);
});
