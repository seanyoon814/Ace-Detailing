const mongoose = require("mongoose");
const logger = require("../utils/logger");

const { ObjectId } = mongoose.Types;
const Schema = mongoose.Schema;

const ReportSchema = new Schema(
    {
        status: {
            type: String,
            enum: ["PENDING", "ACCEPTED", "REJECTED"], // todo: define with stakeholder
            default: "PENDING",
        },
        stockNumber: {
            type: String,
            required: true,
            maxLength: 250,
        },
        services: [{
            name: String,
            price: Number,
            justification: String,
            status: {
                type: String,
                enum: ["PENDING", "ACCEPTED", "REJECTED"],
                default: "PENDING",
            }
        }],
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

ReportSchema.pre("save", (next) => {
    logger.info("Saving document to collection 'reports'.");
    next();
});

ReportSchema.post("save", (document) => {
    logger.info("Saved document with id '%s' to collection 'reports'.", document._id);
});

module.exports = mongoose.model("reports", ReportSchema);