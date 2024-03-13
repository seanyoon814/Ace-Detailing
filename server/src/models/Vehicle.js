const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
    stockNumber: { type: String, required: true},
    vinNumber: { type: String, required: true, validate: /^[A-Z0-9]{17}$/ },
    make: { type: String, required: true, maxLength: 50 },
    model: { type: String, required: true, maxLength: 50 },
    series: { type: String, required: false, maxLength: 50 },
    year: { type: Number, required: true },
    imageUrl: { type: String, required: false, maxLength: 250 },
    notes: { type: String, required: false, maxLength: 1000 },
});

module.exports = mongoose.model("vehicles", VehicleSchema);