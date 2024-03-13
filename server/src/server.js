const express = require('express');
const cors = require('cors');

require('dotenv').config(); // env variables
require("./services/mongodb").initConnection() // init before server start

const logger = require("./utils/logger");

const usersRoutes = require("./routes/users");

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/users", usersRoutes);

app.listen(port, () => {
    logger.info(`Server is running on port ${port}.`);
});
