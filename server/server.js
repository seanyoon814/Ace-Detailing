const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require("./userRoutes");
require('dotenv').config(); // Env variables

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

