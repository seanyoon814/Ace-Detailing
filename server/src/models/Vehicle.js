const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;
const Schema = mongoose.Schema;

const VehicleSchema = new Schema(
    {
        step: {
            type: String,
            enum: ["1", "2", "3"], // todo: define steps with stakeholder
            default: "1",
        },
        stockNumber: {
            type: String,
            required: true
        },
        vinNumber: {
            type: String,
            required: true,
            validate: /^[A-Z0-9]{17}$/
        },
        make: {
            type: String,
            required: true,
            maxLength: 50
        },
        model: {
            type: String,
            required: true,
            maxLength: 50
        },
        series: {
            type: String,
            required: false,
            maxLength: 50
        },
        year: {
            type: Number,
            required: true
        },
        notes: {
            type: String,
            required: false,
            maxLength: 2500
        },
        imageUrls: [{
            type: String,
            required: false,
            maxLength: 500
        }],
        userId: {
            type: ObjectId,
            required: true,
            ref: "users",
        },
    },
    {
        timestamps: true
    },
);

module.exports = mongoose.model("vehicles", VehicleSchema);