const mongoose = require("mongoose");
const logger = require("../utils/logger");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

const NotificationScema = new Schema ({
    type : {
        type : String,
        enum : ["Report", "Vehicle"],
        required : true
    },
    seen : {
        type : Boolean,
        default : false,
        required : true
    },
    userId : { // either the user received the report or wanting for vehicle
        type : ObjectId,
        required : true
    },
    reportId : {
        type : ObjectId
    },
    vehicleId : {
        type : ObjectId
    }
})

NotificationScema.pre("save", (next) => {
    logger.info("Saving document to collection 'notifications'.");
    next();
})

NotificationScema.post("save", (document) => {
    logger.info("Saved document with id '%s' to collection 'notifications'.", document._id);
});

module.exports = mongoose.model("notifications", NotificationScema);