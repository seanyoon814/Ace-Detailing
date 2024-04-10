const mongoose = require("mongoose");
const logger = require("../utils/logger");
const Notification = require("./Notification");

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
            // required: true
        },
        vehicle: {
            type: String,
            required: true,
            maxLength: 150
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
        approved: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true
    },
);

VehicleSchema.pre("save", (next) => {
    logger.info("Saving document to collection 'vehicles'.");
    next();
});

VehicleSchema.post("save", (document) => {
    logger.info("Saved document with id '%s' to collection 'vehicles'.", document._id);
    
    const notification = new Notification({
        type : "Vehicle",
        userId : document.userId,
        vehicleId : document._id
    })
    notification.save();
});

module.exports = mongoose.model("vehicles", VehicleSchema);