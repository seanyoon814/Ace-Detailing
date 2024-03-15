const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;
const Schema = mongoose.Schema;

const ReportSchema = new Schema(
    {
        status: {
            type: String,
            enum: ["PENDING", "ACCEPTED", "REJECTED"], // todo: define with stakeholder
            default: "PENDING",
        },
        title: {
            type: String,
            required: true,
            maxLength: 250,
        },
        description: {
            type: String,
            required: true,
            maxLength: 2500,
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
        vehicleId: {
            type: ObjectId,
            required: true,
            ref: "vehicles",
        },
    },
    {
        timestamps: true
    },
);

module.exports = mongoose.model("reports", ReportSchema);