const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require("./routes/userRoutes");

require('dotenv').config(); // Env variables

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use(userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
